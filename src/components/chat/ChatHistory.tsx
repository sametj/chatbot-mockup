import clipBoardIcon from "@/assets/svg/clipboard-text.svg";
import { useRef } from "react";
import { toast } from "react-toastify";

import pinnedIcon from "@/assets/svg/push-pin-fill.svg";
import unpinnedIcon from "@/assets/svg/push-pin.svg";
import { Query } from "@/interfaces";

export default function ChatHistory({
  id,
  text,
  isPinned,
  setChatHistory,
}: {
  id: string;
  text: string;
  isPinned: boolean;
  setChatHistory: React.Dispatch<React.SetStateAction<Query[]>>;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  function copyToClipBoard() {
    const text = textRef.current?.innerText;
    navigator.clipboard.writeText(text as string);
    toast.success("Copied to clipboard!");
  }
  function handleIsPinned() {}

  return (
    <div className="flex gap-8">
      <div className="relative flex h-fit w-4/5 shrink-0 items-center justify-center text-nowrap rounded-md bg-base-200 p-8">
        <span ref={textRef} className="flex-1 overflow-x-auto text-center">
          {text}
        </span>
        <button onClick={copyToClipBoard}>
          <img src={clipBoardIcon} alt="copy icon" />
        </button>
      </div>
      <button>
        <img src={isPinned ? pinnedIcon : unpinnedIcon} />
      </button>
    </div>
  );
}
