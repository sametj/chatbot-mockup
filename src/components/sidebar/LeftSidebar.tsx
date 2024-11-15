import { useState } from "react";
import api from "../../services/api";
import SidebarButton from "../SidebarButton";
import leftsidebar from "/sidebar-left.svg";

import chatIcon from "@/assets/svg/chat-circle-dots.svg";
import { ChatHistoryProps, Query } from "@/interfaces";
import { toast } from "react-toastify";
import FileUpload from "../FileUpload";
import ChatHistory from "../chat/ChatHistory";

export default function LeftSideBar({
  chatHistory,
  setChatHistory,
}: ChatHistoryProps) {
  const [isLeftNavToggled, setIsLeftNavToggled] = useState(false);

  async function clearCache() {
    try {
      const response = await api.post("/clear_cache", null, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });
      if (response.status === 200) {
        toast.success("Cache Sucessfully Cleared");
      } else {
        toast.error("Failed to clear cache");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <aside
      className={`relative transition-all duration-300 ease-linear ${isLeftNavToggled ? "w-500" : "w-50"} flex flex-col items-center`}
    >
      <button
        className="self-end"
        onClick={() => setIsLeftNavToggled(!isLeftNavToggled)}
      >
        <img className="h-50 w-25" src={leftsidebar} alt="sidebar toggle" />
      </button>
      <section
        className={`flex h-[80%] w-full flex-col ${!isLeftNavToggled ? "-translate-x-600" : ""} overflow-auto transition-all duration-300 ease-in`}
      >
        <div className="flex flex-col justify-between gap-20 px-30 py-20">
          <FileUpload />
          <SidebarButton icon={chatIcon} text="Chat" />
          <SidebarButton icon={chatIcon} text="Data" />
          <h2 className="font-bold text-zinc-500">Pinned Chats</h2>
          <div className="flex max-h-300 flex-col gap-20 overflow-auto">
            {chatHistory
              .filter((h) => h.isPinned)
              .map((h) => (
                <ChatHistory
                  key={h.id}
                  id={h.id}
                  text={h.content as string}
                  isPinned={h.isPinned as boolean}
                  setChatHistory={setChatHistory}
                />
              ))}
          </div>
          <h2 className="font-bold text-zinc-500">Chat History</h2>
          <div className="flex max-h-400 flex-col gap-20 overflow-auto">
            {chatHistory.map((h: Query) => (
              <ChatHistory
                id={h.id}
                key={h.id}
                text={h.content as string}
                isPinned={h.isPinned as boolean}
                setChatHistory={setChatHistory}
              />
            ))}
          </div>
        </div>
      </section>
      <button
        onClick={() => clearCache()}
        className={`btn btn-primary btn-wide absolute bottom-0 mb-10 h-50 self-center rounded-lg text-lg font-bold text-white ${!isLeftNavToggled ? "-translate-x-600" : ""} transition-all duration-300 ease-in`}
      >
        Clear Cache
      </button>
    </aside>
  );
}
