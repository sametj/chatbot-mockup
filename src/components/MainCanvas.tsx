import { useState } from "react";
import send from "/paper-plane-right-fill.svg";
import leftsidebar from "/sidebar-left.svg";
import rightsidebar from "/sidebar-right.svg";

export default function MainCanvas() {
  const [isLeftNavToggled, setIsLeftNavToggled] = useState(false);
  const [isRightNavToggled, setIsRightNavToggled] = useState(false);

  return (
    <div className="grid h-dvh grid-rows-[100px_1fr_100px] bg-base-200">
      <header className="grid-row-1 flex h-full w-full items-center justify-between border-b-2 border-black bg-base-300">
        <img className="h-full w-100" src="" alt="" />
        <h1 className="text-30 font-bold">Solution Name</h1>
        <div className="flex gap-2 px-20">
          <button className="btn btn-primary">Solution 1</button>
          <button className="btn btn-primary">Solution 2</button>
          <button className="btn btn-primary">Solution 3</button>
          <button className="btn btn-primary">Solution 4</button>
          <button className="btn btn-primary">Solution 5</button>
          <button className="btn btn-primary">Solution 6</button>
        </div>
      </header>
      <main className="grid-row-2 flex border-b-2 border-black">
        <aside
          style={{
            width: isLeftNavToggled ? "300px" : "50px",
          }}
          className="h-full overflow-hidden rounded-tr-2xl border-r-2 transition-all duration-300"
        >
          <div className="flex w-full items-center justify-end p-8">
            <button onClick={() => setIsLeftNavToggled(!isLeftNavToggled)}>
              <img
                className="h-50 w-25"
                src={leftsidebar}
                alt="sidebar toggle"
              />
            </button>
          </div>
        </aside>
        <section className="flex flex-1 flex-col rounded-2xl">
          <div className="flex-1 bg-base-200 p-8">
            <div className="h-full rounded-3xl bg-base-100 p-8 shadow-md">
              chat content
            </div>
          </div>
          <div className="flex h-100 w-full items-center bg-base-200">
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
        </section>
        <aside
          style={{
            width: isRightNavToggled ? "300px" : "60px",
          }}
          className="h-full border-l-2 transition-all duration-300"
        >
          <div className="relative flex items-center justify-around">
            <button
              className="absolute left-20 top-10"
              onClick={() => setIsRightNavToggled(!isRightNavToggled)}
            >
              <img
                className="h-50 w-25"
                src={rightsidebar}
                alt="right side bar toggle"
              />
            </button>
          </div>
        </aside>
      </main>
      <footer className="grid-row-3 bg-base-300">Test</footer>
    </div>
  );
}
