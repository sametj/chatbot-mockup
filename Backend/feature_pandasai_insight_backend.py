from fastapi import FastAPI, File, UploadFile, HTTPException, Header
from pandasai import SmartDatalake
import pandasai as pai
from pandasai.responses.streamlit_response import StreamlitResponse
from langchain.chat_models import ChatOpenAI
import pandas as pd
import os
import logging
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

# uvicorn feature_pandasai_insight_backend:app --host 0.0.0.0 --port 8102 --reload --log-level debug
# uvicorn feature_pandasai_insight_backend:app --host 0.0.0.0 --port 8102


logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app = FastAPI()

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']       
)

# Store the processed SmartDatalake object for reuse
smart_datalake = None

file_formats = {
    "csv": pd.read_csv,
    "xls": pd.read_excel,
    "xlsx": pd.read_excel,
    "xlsm": pd.read_excel,
    "xlsb": pd.read_excel,
}

class RequestQuestion(BaseModel):
    question: str

class RequestTable(BaseModel):
    chart_df: dict

@app.post("/process_file")
async def process_file(file: UploadFile, authorization: str = Header(...)):
    global smart_datalake
    api_key = authorization.split(" ")[1]
    # logger.debug(file)
    try:
        # Load file to DataFrame
        ext = os.path.splitext(file.filename)[1][1:].lower()
        if ext in file_formats:
            df1 = file_formats[ext](file.file, sheet_name="df1")
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file format: {ext}")
        # Load file into SmartDatalake
        llm = ChatOpenAI(temperature=0, model="gpt-4o-mini", api_key=api_key)
        smart_datalake = SmartDatalake([df1], 
                                    config={"llm": llm, 
                                                "enable_cache": True,
                                                "use_error_correction_framework": True,
                                                "response_parser": StreamlitResponse,
                                            })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"detail": "File processed successfully"}

@app.post("/query")
async def query(item: RequestQuestion):
    global smart_datalake
    question = item.question
    if smart_datalake is None:
        raise HTTPException(status_code=400, detail="No data available. Please upload a file first.")
    try:
        response = smart_datalake.chat(question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    return {"answer": response,
            "query": smart_datalake.last_code_executed            
            }

@app.post("/generate_insight")
async def generate_insight(item: RequestTable, authorization: str = Header(...)):
    api_key = authorization.split(" ")[1]
    chart_df = item.chart_df
    system_prompt = """
    You are a skilled data analyst who excels at interpreting complex financial data and explaining it in simple, relatable terms. 
    Your task is to summarize the key insights from the dataset, focusing on the specific columns provided. 
    Tailor your summary to highlight the most important trends and changes, 
    make the information accessible to someone with no background in statistics or finance. 
    Avoid technical jargon and ensure the summary is clear and engaging.
    Don't use any markdown bold and italic mark up in any number in the response. 
    """
    prompt = f"""
    Summarize the insights from:
    {chart_df}
    make sure the key points titles catch the reader's attention and the
    words are professional and easy to understand.
    """
    try:
        client = OpenAI(
            api_key=api_key
        )
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ]
        )
        summary_text = completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"summary": summary_text}

@app.post("/clear_cache")
async def clear_cache(authorization: str = Header(...)):
    try:
        pai.clear_cache()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"detail": "Cache cleared successfully"}