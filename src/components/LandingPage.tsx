import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex h-screen w-full flex-col flex-wrap items-center justify-center gap-10 bg-blue-900/20">
      <h1 className="text-30 font-bold">Solutions</h1>
      <div className="flex gap-20">
        <PageCards title="Budget Insights" />
        <PageCards title="Coming Soon!" isDisabled={true} />
        <PageCards title="Coming Soon!" isDisabled={true} />
      </div>
    </div>
  );
}

function PageCards({
  title,
  isDisabled,
}: {
  title: string;
  isDisabled?: boolean;
}) {
  const navigate = useNavigate();

  function handleClick(route: string) {
    navigate(route);
  }
  return (
    <>
      {isDisabled ? (
        <button
          disabled
          className="btn btn-square h-150 w-200 bg-stone-500 shadow-lg"
        >
          <span className="flex h-full w-full items-center justify-center rounded-md bg-stone-300 text-lg font-bold text-black">
            {title}
          </span>
        </button>
      ) : (
        <button
          onClick={() => handleClick("/home")}
          className="btn btn-square btn-primary h-150 w-200 shadow-lg"
        >
          <span className="flex items-center justify-center text-lg font-bold">
            {title}
          </span>
        </button>
      )}
    </>
  );
}
