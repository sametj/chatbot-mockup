export default function FileUpload() {
  return (
    <div>
      <span>Upload a Data File</span>
      <div className="flex flex-col rounded-lg bg-stone-300 p-8">
        <span className="font-bold">Drag and drop file here</span>
        <span>
          Limit 200MB per file
          <li>CSV, XLS, XLSX, XLSM, XLSB</li>
        </span>
        <button className="btn btn-primary btn-sm mt-10 self-start rounded-lg">
          Browse Files
        </button>
      </div>
    </div>
  );
}
