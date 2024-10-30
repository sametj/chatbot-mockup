import { useState } from "react";
import send from "/paper-plane-right-fill.svg";
import leftsidebar from "/sidebar-left.svg";
import rightsidebar from "/sidebar-right.svg";

export default function MainCanvas() {
  return (
    <div className="grid h-dvh grid-rows-[100px_1fr] bg-base-200">
      <header className="grid-row-1 flex h-full w-full items-center justify-between border-b-2 border-black bg-base-300">
        <img
          className="w-100 h-full"
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
      <main className="grid-row-2 flex border-b-2 border-black">
        <LeftSideBar />
        <section className="flex flex-1 flex-col rounded-2xl">
          <div className="flex-1 bg-base-200 p-8">
            <div className="h-full rounded-3xl bg-base-100 p-8 shadow-md">
              chat content
            </div>
            <div className="h-100 flex w-full items-center bg-base-200">
              <div className="join mx-auto rounded-lg shadow-md">
                <div>
                  <div>
                    <input
                      className="input join-item input-bordered"
                      placeholder="Ask me something"
                    />
                  </div>
                </div>
                <select className="join-item select select-bordered">
                  <option disabled selected>
                    Filter
                  </option>
                  <option>Sci-fi</option>
                  <option>Drama</option>
                  <option>Action</option>
                </select>
                <div className="indicator">
                  <button className="btn join-item">
                    <img src={send} alt="send icon" />
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
      className={`relative h-full transition-all duration-300 ease-linear ${isLeftNavToggled ? "w-300" : "w-50"} `}
    >
      <button
        className="absolute right-0 top-0"
        onClick={() => setIsLeftNavToggled(!isLeftNavToggled)}
      >
        <img className="h-50 w-25" src={leftsidebar} alt="sidebar toggle" />
      </button>
      <div className="inline-flex"></div>
    </aside>
  );
}

function RightSideBar() {
  const [isRightNavToggled, setIsRightNavToggled] = useState(false);
  return (
    <aside
      className={`relative h-full transition-all duration-300 ease-linear ${isRightNavToggled ? "w-300" : "w-50"} `}
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
