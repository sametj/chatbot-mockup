import api from "@/services/api";
import React, { FormEvent, useEffect, useRef, useState } from "react";

interface Query {
  question: string;
  response: string | null;
}

interface TextBoxProps {
  queries: Query[];
  setQueries: (queries: Query[]) => void;
  setIsLoading: (bool: boolean) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  queries,
  setQueries,
  setIsLoading,
}) => {
  const [divHeight, setDivHeight] = useState(50);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleResize = () => {
      setDivHeight(Math.min(textarea.scrollHeight, 240));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(textarea);

    textarea.addEventListener("input", handleResize);

    return () => {
      resizeObserver.disconnect();
      textarea.removeEventListener("input", handleResize);
    };
  }, []);

  const handleTextSubmit = (event: FormEvent) => {
    event.preventDefault();
    setQuestion(textareaRef.current?.value || "");
    document.querySelector<HTMLTextAreaElement>("#chat")!.value = "";
    callQuery();
  };

  const callQuery = async () => {
    const payload = { question };

    setIsLoading(true);

    try {
      const response = await api.post("/query", payload);
      if (response.status === 200) {
        const answerJson = response.data.answer;
        setAnswer(answerJson);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (question && answer) {
    const newQuery: Query = { question, response: answer };
    setQueries([...queries, newQuery]);
    // }
  }, [question, answer, setQueries]);

  return (
    <div className="bottom-0 right-0 flex w-full items-center justify-center p-8">
      <form
        style={{ height: divHeight }}
        onSubmit={handleTextSubmit}
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
