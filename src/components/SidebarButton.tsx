export default function SidebarButton({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <button className="flex w-full items-center gap-20">
      <img src={icon} alt={`${text} icon`} />
      <span>{text}</span>
    </button>
  );
}
