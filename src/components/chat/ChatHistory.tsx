export default function ChatHistory({ text }: { text: string }) {
  return (
    <p className="h-fit shrink-0 truncate rounded-md bg-base-200 p-8">{text}</p>
  );
}
