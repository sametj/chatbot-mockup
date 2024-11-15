import { Query } from "@/interfaces";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./chat/ChatArea";
import { Header } from "./Header";
import LeftSideBar from "./sidebar/LeftSidebar";
import RightSideBar from "./sidebar/RightSidebar";

export default function MainCanvas() {
  const [chatHistory, setChatHistory] = useState<Query[]>(
    localStorage.getItem("ChatHistory") === null
      ? []
      : JSON.parse(localStorage.getItem("ChatHistory") as string),
  );
  return (
    <div className="relative mx-auto flex h-screen w-full flex-col bg-[#f7f8fa] font-sans">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Bounce}
      />
      <Header />
      <main className="flex h-full w-full overflow-auto">
        <LeftSideBar
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
        <Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />
        <RightSideBar />
      </main>
    </div>
  );
}
