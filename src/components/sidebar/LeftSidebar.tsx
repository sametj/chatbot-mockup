import { ChangeEvent, useState } from "react";
import api from "../../services/api";
import ChatHistory from "../chat/ChatHistory";
import leftsidebar from "/sidebar-left.svg";

const textdemo =
  "at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!orem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!";

export default function LeftSideBar() {
  const [isLeftNavToggled, setIsLeftNavToggled] = useState(false);

  async function handleFileSubmit(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await api.post("/process_file", formData, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });
      if (response.status === 200) {
        console.log("file uploaded sucessfukl");
      } else {
        console.log("Failed to upload file");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <aside
      className={`relative transition-all duration-300 ease-linear ${isLeftNavToggled ? "w-300" : "w-50"} flex flex-col items-center`}
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
          <input
            onChange={handleFileSubmit}
            type="file"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs rounded-lg"
          />
          <button className="btn btn-primary">Chat</button>
          <button className="btn btn-primary">Data</button>
          <h2 className="font-bold text-zinc-500">Pinned Chats</h2>
          <div className="flex max-h-300 flex-col gap-20 overflow-auto">
            <ChatHistory text={textdemo} />
          </div>
          <h2 className="font-bold text-zinc-500">Chat History</h2>
          <div className="flex max-h-300 flex-col gap-20 overflow-auto">
            <ChatHistory text={textdemo} />
          </div>
        </div>
      </section>
      <button className="btn btn-primary absolute bottom-0 mb-20 h-50 self-center">
        Clear Cache
      </button>
    </aside>
  );
}
