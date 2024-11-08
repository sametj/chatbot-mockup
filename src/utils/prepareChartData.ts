import { ChartData } from "@/interfaces";
import { DataFrame } from "danfojs";

const prepareChartData = async (df: DataFrame): Promise<ChartData> => {
  // Prepare data for chart rendering
  const numericCols = df.select_dtypes(['float32', 'float64', 'int32', 'int64']).columns;
  return {
    labels: Array.from(df.index.values()).map(String) as string[],
    datasets: numericCols.map((col: string, index: number) => ({
      label: col,
      data: df[col].values as number[],
      backgroundColor: `rgba(${(index + 1) * 50}, 99, 132, 0.2)`,
      borderColor: `rgba(${(index + 1) * 50}, 99, 132, 1)`,
      borderWidth: 1,
    })),
  };
};

export default prepareChartData;