
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



  return newData;
}








