import { ChatHistoryProps, Query, TextBoxProps } from "@/interfaces";
import api from "@/services/api";

import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InsightsContainer from "../InsightsContainer";

function TextBox({
  setQueries,
  setIsLoading,
  chatHistory,
  setChatHistory,
}: TextBoxProps & ChatHistoryProps) {
  const [divHeight, setDivHeight] = useState(10);
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

  useEffect(() => {
    localStorage.setItem("ChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  function handleTextSubmit(event: FormEvent) {
    event.preventDefault();
    const newQuestion = String(textareaRef.current?.value as string);
    if (!newQuestion) return;
    const newQuery: Query = {
      id: String(Date.now()),
      content: newQuestion,
      type: "UserChat",
      isPinned: false,
    };
    setQueries((q) => [...q, newQuery]);
    setChatHistory((history) => [...history, newQuery || ""]);
    callQuery(newQuestion);
    document.querySelector<HTMLTextAreaElement>("#chat")!.value = "";
  }

  async function callQuery(question: string | null) {
    const payload = { question };
    setIsLoading(true);

    try {
      const response = await api.post("/query", payload, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const answerJson = response.data.answer;
        console.log(answerJson);

        let insight = null;

        try {
          const insights = await api.post(
            "/generate_insight",
            { chart_df: answerJson },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
            },
          );
          insight = insights.data.summary;
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error occurred.");
          }
        }

        const newQuery: Query = {
          id: String(Date.now()),
          content: answerJson,
          type: "BotChat",
          insights: <InsightsContainer insights={insight} />,
        };
        setQueries((queries) => [...queries, newQuery]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="my-auto flex w-full items-center justify-center p-8">
      <form
        onSubmit={handleTextSubmit}
        style={{ height: divHeight }}
        className="relative flex w-3/5 items-center justify-start rounded-2xl bg-base-100 p-8 shadow-md"
      >
        <textarea
          ref={textareaRef}
          name="chat"
          id="chat"
          placeholder="Ask me anything"
          className="h-full min-h-60 w-[93%] resize-none rounded-lg bg-transparent p-12 outline-none"
        />
        <button
          type="submit"
          className="btn btn-circle btn-primary btn-md absolute bottom-5 right-10 flex w-50 items-center justify-center"
        >
          <img
            className="h-full w-16"
            src="/paper-plane-right-fill.svg"
            alt="send icon"
          />
        </button>
      </form>
    </div>
  );
}

export default TextBox;
