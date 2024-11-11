import robot from "/robot-fill.svg";

export function BotChat({
  content,
  children,
}: {
  content?: string | React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-start gap-20 self-start">
      <img className="avatar chat-image" src={robot} alt="robot-icon" />
      <div className="chat-bubble">{content ? content : children}</div>
    </div>
  );
}

export function UserChat({ text }: { text: string }) {
  return (
    <div className="flex justify-end gap-20 self-end">
      <div className="chat-bubble">{text}</div>
      <img className="avatar chat-image" src={robot} alt="robot-icon" />
    </div>
  );
}
