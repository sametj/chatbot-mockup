import { useState } from "react";
import rightsidebar from "/sidebar-right.svg";

export default function RightSideBar() {
  const [isRightNavToggled, setIsRightNavToggled] = useState(false);
  return (
    <aside
      className={`relative rounded-2xl bg-white transition-all duration-300 ease-linear ${isRightNavToggled ? "w-500" : "w-50"} `}
    >
      <button
        className="absolute left-10"
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
