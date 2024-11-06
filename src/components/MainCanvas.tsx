import Chat from "./chat/ChatArea";
import { Header } from "./Header";
import LeftSideBar from "./sidebar/LeftSidebar";
import RightSideBar from "./sidebar/RightSidebar";

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
