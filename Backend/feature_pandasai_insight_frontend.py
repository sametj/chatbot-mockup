# Streamlit Frontend Code
from langchain.chat_models import ChatOpenAI
import streamlit as st
import pandas as pd
import requests
import os

file_formats = {
    "csv": pd.read_csv,
    "xls": pd.read_excel,
    "xlsx": pd.read_excel,
    "xlsm": pd.read_excel,
    "xlsb": pd.read_excel,
}

def clear_submit():
    st.session_state["submit"] = False

def format_financial_figures(input_data):
    # Check if the input is a DataFrame
    if isinstance(input_data, pd.DataFrame):
        # Formatting the numerical columns
        for column in input_data.select_dtypes(include=['float', 'int']):
            # Check if all values in the column are within 0 to 100
            if input_data[column].apply(lambda x: 0.00 <= x <= 100.00).all() and not input_data[column].eq(0).all():
                input_data[column] = input_data[column].apply(lambda x: "{:.2f}%".format(x))
            else:
                input_data[column] = input_data[column].apply(lambda x: "${:,.2f}".format(x))
        return input_data
    else:
        # If the input is not a DataFrame, return it as is
        return input_data
    
st.set_page_config(page_title="Budget Insights Chatbot", page_icon="📋")
st.title("Budget Insights Chatbot")

openai_api_key = st.sidebar.text_input(
    "OpenAI API Key", "sk-proj-yBNSPE2F9QJdFHjfk66sT3BlbkFJuL0mV63AMw0By1hDAxbq", type="password"
)

uploaded_file = st.sidebar.file_uploader(
    "Upload a Data file",
    type=list(file_formats.keys()),
    help="Various File formats are Support",
    on_change=clear_submit,
)

# Send file to backend API
if uploaded_file and openai_api_key:
    response = requests.post(
        "http://127.0.0.1:8102/process_file",
        files={"file": uploaded_file},
        headers={"Authorization": f"Bearer {openai_api_key}"}
    )
    if response.status_code == 200:
        st.success("File processed successfully.")
    else:
        st.error("Failed to process file. Please check your API key and try again.")

st.sidebar.subheader("Questions:")
st.sidebar.code('''What are the obligations and commitments by Budget Type?''',language="markdown")
st.sidebar.code('''What are the obligations and commitments by Fiscal Year and by Branch?''',language="markdown")
st.sidebar.code('''Create a table showing branch, allocation amount, obligation and variance by branch where variance is defined as Allocation amount - Obligation?''',language="markdown")
st.sidebar.code('''What are the projects where sum of obligations exceed the sum of allocation amount?''',language="markdown")
st.sidebar.code('''Create a bar chat showing allocation amount and obligations by branch?''',language="markdown")
st.sidebar.code('''Show me allocations and obligations broken down by CAN?''',language="markdown")

if "messages" not in st.session_state or st.sidebar.button("Clear conversation history"):
    # Send request to backend API to clear cache
    response = requests.post(
        "http://127.0.0.1:8102/clear_cache",
        headers={"Authorization": f"Bearer {openai_api_key}"}
    )
    if response.status_code == 200:
        st.success(response.json().get("detail"))
    else:
        st.error("Failed to clear cache from the backend API.")
    st.session_state["messages"] = [{"role": "assistant", "content": "How can I help you?"}]

# Keep chat history in page
for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input(placeholder="What is this data about?"):
    st.chat_message("user").markdown(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("assistant"):
        with st.spinner(f"Getting Response... This may take a while⏳"):
            payload = {"question": prompt}
            # Send question to backend API
            response = requests.post(
                "http://127.0.0.1:8102/query",
                json=payload
            )
            if response.status_code == 200:
                answer_json = response.json().get("answer")
                try:
                    answer = pd.DataFrame(answer_json)
                except:
                    answer = answer_json
            else:
                st.error("Failed to get response from the backend API.")
            
            # Clone the DataFrame for formatting
            formatted_df = answer.copy() if isinstance(answer, pd.DataFrame) else response
            
            # Format the cloned DataFrame for display
            formatted_df = format_financial_figures(formatted_df)

            # Display the formatted DataFrame         
            st.write(formatted_df)
            st.session_state.messages.append({"role": "assistant", "content": formatted_df})

            if isinstance(answer, pd.DataFrame):
                chart_df = pd.DataFrame(answer)
                chart_df.set_index(chart_df.columns[0], inplace=True)
                # split the data into two parts, one with only numeric columns and the other with only non-numeric columns
                numeric_df = chart_df.select_dtypes(include='number')
                non_numeric_df = chart_df.select_dtypes(exclude='number')
                with st.expander("Show Visual"):
                    chart = st.bar_chart(chart_df)
                with st.expander("Show Insights"):   
                    # Send DataFrame to backend API for insights
                    response = requests.post(
                        "http://127.0.0.1:8102/generate_insight",
                        json={"chart_df": chart_df.to_dict()},
                        headers={"Authorization": f"Bearer {openai_api_key}"}
                    )
                    if response.status_code == 200:
                        summary_text = response.json().get("summary")
                        st.write(summary_text)
                    else:
                        st.error("Failed to generate insights from the backend API.")