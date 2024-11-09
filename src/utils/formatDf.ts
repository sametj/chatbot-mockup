import { DataFrame } from "danfojs";

interface OriginalData {
  [key: string]: Record<string, unknown>;
}

interface GenericData {
  [key: string]: unknown[];
}

export default function formatDf(answer: OriginalData) {
  const newData: GenericData = {};
  Object.entries(answer).forEach(([key, value]) => {
    newData[key] = Object.values(value);
  });

  const formattedAnswer = new DataFrame(newData);

  return formattedAnswer;
}








