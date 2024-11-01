import { useEffect, useRef, useState } from "react";
import send from "/paper-plane-right-fill.svg";
import leftsidebar from "/sidebar-left.svg";
import rightsidebar from "/sidebar-right.svg";

export default function MainCanvas() {
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

  return (
    <div className="grid h-dvh grid-rows-[100px_1fr] bg-base-200">
      <header className="grid-row-1 flex h-full w-full items-center justify-between border-b-2 border-black bg-base-300">
        <img
          className="h-full w-100"
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
      <main className="flex border-b-2 border-black">
        <LeftSideBar />
        <section className="flex flex-1 flex-col rounded-2xl">
          <div className="flex flex-1 flex-col bg-base-200 p-8">
            <div className="relative flex h-full flex-col rounded-3xl bg-gradient-to-br from-base-100 from-30% to-violet-400 to-100% p-8 shadow-md">
              <div className="w-full flex-1 p-8">Test</div>
              <div className="flex w-full items-center justify-center p-8">
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
            </div>
          </div>
        </section>
        <RightSideBar />
      </main>
    </div>
  );
}

function LeftSideBar() {
  const [isLeftNavToggled, setIsLeftNavToggled] = useState(false);
  return (
    <aside
      className={`relative h-full w-300 transition-all duration-300 ease-linear ${isLeftNavToggled ? "w-500" : "w-50"} `}
    >
      <button
        className="absolute right-0 top-0 z-10"
        onClick={() => setIsLeftNavToggled(!isLeftNavToggled)}
      >
        <img className="h-50 w-25" src={leftsidebar} alt="sidebar toggle" />
      </button>
      <div
        className={`h-full w-full ${!isLeftNavToggled && "-translate-x-600"} grid grid-rows-[250px_400px_400px] gap-20 transition-all duration-300`}
      >
        <div className="row-span-1 row-start-1 flex flex-col items-center justify-center gap-20">
          <button className="btn btn-primary btn-wide rounded-lg">
            Upload Data
          </button>
          <button className="btn btn-primary btn-wide rounded-lg">Chat</button>
          <button className="btn btn-primary btn-wide rounded-lg">
            View Data
          </button>
        </div>

        {/* Pinned Chats */}
        <div className="row-span-1 row-start-2 flex w-500 grow-0 flex-col items-center gap-20 p-8">
          <h2 className="text-30 font-bold">Pinned Chats</h2>
          <div className="flex h-full w-full flex-col items-center gap-20 overflow-auto">
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
          </div>
        </div>

        {/* Chat history */}
        <div className="row-span-1 row-start-3 flex w-500 grow-0 flex-col items-center gap-20 p-8">
          <h2 className="text-30 font-bold">Chat History</h2>
          <div className="flex h-full w-full flex-col items-center gap-20 overflow-auto">
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
            <p className="h-50 w-full shrink-0 truncate rounded-lg bg-base-300 p-12">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              explicabo, quam cupiditate perferendis dicta atque sunt iste minus
              consequatur! Deserunt adipisci saepe dicta tempore, unde odit
              sapiente vel quaerat totam.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function RightSideBar() {
  const [isRightNavToggled, setIsRightNavToggled] = useState(false);
  return (
    <aside
      className={`relative h-full transition-all duration-300 ease-linear ${isRightNavToggled ? "w-500" : "w-50"} `}
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
