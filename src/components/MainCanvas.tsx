import { useEffect, useRef, useState } from "react";
import send from "/paper-plane-right-fill.svg";
import robot from "/robot-fill.svg";
import leftsidebar from "/sidebar-left.svg";
import rightsidebar from "/sidebar-right.svg";

const text =
  "LLorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!orem, ipsum dolor sit amet consectetur adipisicing elit. Facilis earum incidunt recusandae aliquam porro corrupti voluptates at eius adipisci illum illo quis vel, saepe reiciendis sit dolorum natus quaerat tenetur!";

export default function MainCanvas() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col bg-base-200">
      <Header />
      <main className="flex h-full w-full overflow-auto">
        <LeftSideBar />
        <Chat />
        <RightSideBar />
      </main>
    </div>
  );
}

function LeftSideBar() {
  const [isLeftNavToggled, setIsLeftNavToggled] = useState(false);
  return (
    <aside
      className={`relative transition-all duration-300 ease-linear ${isLeftNavToggled ? "w-300" : "w-50"} overflow-auto`}
    >
      <button
        className="absolute right-0 top-0 z-10"
        onClick={() => setIsLeftNavToggled(!isLeftNavToggled)}
      >
        <img className="h-50 w-25" src={leftsidebar} alt="sidebar toggle" />
      </button>
      <section
        className={`flex w-full flex-col ${!isLeftNavToggled ? "-translate-x-600" : ""} transition-all duration-300 ease-in`}
      >
        <div className="flex flex-col justify-between gap-20 px-30 py-20">
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs rounded-lg"
          />
          <button className="btn btn-primary">Chat</button>
          <button className="btn btn-primary">Data</button>
          <h2 className="font-bold text-zinc-500">Pinned Chats</h2>
          <div className="flex max-h-300 flex-col gap-20 overflow-auto">
            <ChatHistory text={text} />
          </div>
          <h2 className="font-bold text-zinc-500">Chat History</h2>
          <div className="flex max-h-300 flex-col gap-20 overflow-auto">
            <ChatHistory text={text} />
          </div>
        </div>
        <button className="btn btn-primary mx-auto mt-20">Clear Cache</button>
      </section>
    </aside>
  );
}

function RightSideBar() {
  const [isRightNavToggled, setIsRightNavToggled] = useState(false);
  return (
    <aside
      className={`relative transition-all duration-300 ease-linear ${isRightNavToggled ? "w-300" : "w-50"} `}
    >
      <button
        className="absolute left-0"
        onClick={() => setIsRightNavToggled(!isRightNavToggled)}
      >
        <img
          className="h-50 w-25"
          src={rightsidebar}
          alt="right side bar toggle"
        />
      </button>
    </aside>
  );
}

function Chat() {
  return (
    <section className="mx-20 flex w-full flex-col bg-red-200">
      <div className="flex-flex-col relative mx-auto h-full w-3/5 bg-blue-200">
        <TextBox />
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="aspect-1 flex h-60 w-full items-center justify-between border-b-2 border-black bg-base-300">
      <img
        className="h-full w-60"
        src="https://tse3.mm.bing.net/th/id/OIP.ttrMGJgcP1foipZsNg_IsgHaHa?rs=1&pid=ImgDetMain"
        alt=""
      />
      <h1 className="text-30 font-bold">Solution Name</h1>
      <div className="flex gap-2 px-20">
        <button className="btn btn-accent btn-active btn-md rounded-lg">
          Solution 1
        </button>
        <button className="btn btn-accent btn-active rounded-lg">
          Solution 1
        </button>
        <button className="btn btn-accent btn-active rounded-lg">
          Solution 1
        </button>
        <button className="btn btn-accent btn-active rounded-lg">
          Solution 1
        </button>
        <button className="btn btn-accent btn-active rounded-lg">
          Solution 1
        </button>
        <button className="btn btn-accent btn-active rounded-lg">
          Solution 1
        </button>
      </div>
    </header>
  );
}

function ChatHistory({ text }: { text: string }) {
  return (
    <p className="h-fit shrink-0 truncate rounded-md bg-base-200 p-8">{text}</p>
  );
}

function TextBox() {
  const [divHeight, setDivHeight] = useState(100);
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

  return (
    <div className="absolute bottom-0 flex w-full items-center justify-center p-8">
      <div
        style={{
          height: divHeight,
        }}
        className="relative flex w-3/5 items-center justify-start rounded-2xl bg-base-200 p-8 shadow-md"
      >
        <textarea
          ref={textareaRef}
          name="chat"
          id="chat"
          placeholder="Ask me anything"
          className="h-full min-h-100 w-[93%] resize-none rounded-lg bg-transparent p-12 outline-none"
        />
        <button className="btn btn-circle btn-md absolute bottom-20 right-10 flex w-50 items-center justify-center bg-violet-400">
          <img className="h-full w-25" src={send} alt="send icon" />
        </button>
      </div>
    </div>
  );
}

function BotChat({ text }: { text: string }) {
  return (
    <div className="chat chat-start flex gap-20">
      <img className="avatar chat-image" src={robot} alt="robot-icon" />
      <div className="chat-bubble">{text}</div>
    </div>
  );
}

function UserChat({ text }: { text: string }) {
  return (
    <div className="chat chat-start flex gap-20">
      <img className="avatar chat-image" src={robot} alt="robot-icon" />
      <div className="chat-bubble">{text}</div>
    </div>
  );
}
