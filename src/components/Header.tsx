export function Header() {
  return (
    <header className="aspect-1 flex h-60 w-full items-center justify-between border-b-2 border-black bg-base-300">
      <img
        className="h-full w-60"
        src="https://tse3.mm.bing.net/th/id/OIP.ttrMGJgcP1foipZsNg_IsgHaHa?rs=1&pid=ImgDetMain"
        alt=""
      />
      <h1 className="text-30 font-bold">Solution Name</h1>
      <div className="flex gap-2 px-20">
        <button className="btn btn-accent btn-active btn-md rounded-lg">
          Solution 1
        </button>
      </div>
    </header>
  );
}