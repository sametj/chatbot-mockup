import chatIcon from "@/assets/svg/open-ai-logo.svg";
import userIcon from "@/assets/svg/user-circle.svg";

export function BotChat({
  content,
  children,
}: {
  content?: string | React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="aspect-1 mb-8 flex w-full flex-col items-center self-start rounded-2xl">
      <div className="flex w-full items-center gap-20">
        <img className="avatar chat-image" src={chatIcon} alt="robot-icon" />
        <span className="font-bold">Here's the Information you requested</span>
      </div>
      <div className="chat-bubble flex w-full flex-col gap-20 bg-blue-200 shadow-lg">
        {content || children}
      </div>
    </div>
  );
}

export function UserChat({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col self-start">
      <div className="flex items-center gap-4">
        <img
          className="avatar chat-image self-start"
          src={userIcon}
          alt="robot-icon"
        />
        <span className="font-bold">You</span>
      </div>
      <div className="chat-bubble ml-20 flex text-lg font-semibold text-stone-700">
        {text}
      </div>
    </div>
  );
}
