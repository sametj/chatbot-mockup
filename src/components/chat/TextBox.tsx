import { Query } from "@/interfaces";
import api from "@/services/api";

import { DataFrame } from "danfojs";
import React, { FormEvent, useEffect, useRef, useState } from "react";

interface TextBoxProps {
  queries: Query[];
  setQueries: React.Dispatch<React.SetStateAction<Query[]>>;
  setIsLoading: (bool: boolean) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  queries,
  setQueries,
  setIsLoading,
}) => {
  const [divHeight, setDivHeight] = useState(100);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleResize = () => {
      setDivHeight(Math.min(textarea.scrollHeight, 300));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(textarea);

    textarea.addEventListener("input", handleResize);

    return () => {
      resizeObserver.disconnect();
      textarea.removeEventListener("input", handleResize);
    };
  }, []);

  function handleTextSubmit(event: FormEvent) {
    event.preventDefault();
    const newQuestion = String(textareaRef.current?.value as string);
    const newQuery: Query = {
      id: String(Date.now()),
      content: newQuestion,
      type: "UserChat",
    };
    setQueries([...queries, newQuery]);
    callQuery(newQuestion);
  }

  const callQuery = async (question: string | null) => {
    const payload = { question };

    setIsLoading(true);

    try {
      const response = await api.post("/query", payload);
      if (response.status === 200) {
        const answerJson = response.data.answer;
        console.log(answerJson);

        let formattedAnswer = answerJson;
        if (Array.isArray(answerJson)) {
          formattedAnswer = answerJson.reduce((acc, row) => {
            Object.keys(row).forEach((key) => {
              if (!acc[key]) acc[key] = [];
              acc[key].push(row[key]);
            });

            return acc as DataFrame;
          }, {});
        }

        // const newQuery: Query = {
        //   id: String(Date.now()),
        //   content: answerJson,
        //   type: "BotChat",
        // };
        // setQueries((queries) => [...queries, newQuery]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      document.querySelector<HTMLTextAreaElement>("#chat")!.value = "";
    }
  };

  return (
    <div className="bottom-0 right-0 flex w-full items-center justify-center p-8">
      <form
        onSubmit={handleTextSubmit}
        style={{ height: divHeight }}
        className="relative flex w-3/5 items-center justify-start rounded-2xl bg-base-200 p-8 shadow-md"
      >
        <textarea
          ref={textareaRef}
          name="chat"
          id="chat"
          placeholder="Ask me anything"
          className="h-full min-h-100 w-[93%] resize-none rounded-lg bg-transparent p-12 outline-none"
        />
        <button
          type="submit"
          className="btn btn-circle btn-md absolute bottom-20 right-10 flex w-50 items-center justify-center bg-violet-400"
        >
          <img
            className="h-full w-25"
            src="/paper-plane-right-fill.svg"
            alt="send icon"
          />
        </button>
      </form>
    </div>
  );
};

export default TextBox;
