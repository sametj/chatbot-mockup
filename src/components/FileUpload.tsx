import { FileValidation } from "@/interfaces";
import api from "@/services/api";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Allowed file extensions and max size (200MB)
  const allowedExtensions = ["csv", "xls", "xlsx", "xlsm", "xlsb"];
  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  ];
  const maxSize = 200 * 1024 * 1024; // 200MB in bytes

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const validateFile = (file: FileValidation): boolean => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension = allowedExtensions.includes(fileExtension || "");
    const isValidType = allowedMimeTypes.includes(file.type);
    const isValidSize = file.size <= maxSize;

    if (!isValidExtension) {
      alert(`${file.name} has an unsupported file extension.`);
      return false;
    } else if (!isValidType) {
      alert(`${file.name} is not a supported file type.`);
      return false;
    } else if (!isValidSize) {
      alert(`${file.name} exceeds the maximum file size.`);
      return false;
    }
    return true;
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    if (validateFile(droppedFiles[0])) {
      setFile(droppedFiles[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      const formData = new FormData();

      formData.append("file", selectedFile);

      try {
        const response = await api.post("/process_file", formData, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        });
        if (response.status === 200) {
          console.log("file uploaded sucessfukl");
        } else {
          console.log("Failed to upload file");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <span className="self-start font-semibold">Upload a Data File</span>
      <div
        className={`flex flex-col rounded-lg border-dashed bg-stone-300 p-8 text-center ${
          isDragging ? "border-2 border-blue-500" : "border-2 border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className="font-bold">Drag and drop file here</span>
        <span>
          Limit 200MB per file
          <li>CSV, XLS, XLSX, XLSM, XLSB</li>
        </span>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv, .xls, .xlsx, .xlsm, .xlsb"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="btn btn-primary btn-sm mt-10 cursor-pointer self-start rounded-lg"
        >
          Browse Files
        </label>
      </div>
      {file && (
        <div className="mt-4 w-full">
          <h4 className="font-bold">Selected File:</h4>
          <p className="text-sm">
            {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
}
