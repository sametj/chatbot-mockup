import logo from "/Slide1.jpg";
export function Header() {
  return (
    <header className="aspect-1 flex h-100 w-full items-center justify-between border-b-2 bg-base-100">
      <div className="flex h-full items-center">
        <img className="h-50 p-8" src={logo} alt="" />
        <h1 className="text-30 font-bold">AI Finance Portfolio</h1>
      </div>
      <div className="flex gap-8 px-20">
        <button className="btn btn-primary btn-active btn-md rounded-lg text-white">
          Budget Insights
        </button>
        <button className="btn btn-active btn-md rounded-lg bg-blue-200 text-black">
          Domain Insights
        </button>
        <button className="btn btn-active btn-md rounded-lg bg-blue-200 text-black">
          Obligation Insights
        </button>
        <button className="btn btn-active btn-md rounded-lg bg-blue-200 text-black">
          Form Generation
        </button>
        <button className="btn btn-active btn-md rounded-lg bg-blue-200 text-black">
          Data Call Response
        </button>
      </div>
    </header>
  );
}
