export default function MainCanvas() {
  return (
    <div className="grid grid-rows-[50px_1fr_50px]">
      <header className="row-span-1 flex w-full items-center justify-between border-b-4">
        <img src="" alt="" />
        <span className="font-bold">Solution Name</span>
        <nav className="flex gap-4 py-4">
          <button className="btn btn-primary">Solution 1</button>
          <button className="btn btn-primary">Solution 2</button>
          <button className="btn btn-primary">Solution 3</button>
          <button className="btn btn-primary">Solution 4</button>
          <button className="btn btn-primary">Solution 5</button>
          <button className="btn btn-primary">Solution 6</button>
        </nav>
      </header>
      <div className="h-900 row-span-2 row-start-2 flex w-full flex-1">
        <aside className="w-300 h-full border-r-4 bg-base-300 p-4">
          <span>Test</span>
        </aside>
        <div className="flex h-full flex-1 flex-col bg-base-200 p-8">
          <div className="flex-1">chat section</div>
          <div className="h-200 p-2">
            <div className="mx-auto h-full w-3/5 rounded-lg bg-base-300 p-4">
              test
            </div>
          </div>
        </div>
        <aside className="w-300 h-full bg-base-100 p-4">
          <h1 className="text-center font-bold">How to use this Solution</h1>
        </aside>
      </div>
      <footer className="row-span-3 flex items-center justify-center">
        <span>Test</span>
      </footer>
    </div>
  );
}
