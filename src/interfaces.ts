type ChatType = "UserChat" | 'BotChat';

export interface Query {
  id: string;
  content: string | object;
  type: ChatType
}


export interface DataType {
  [key: string]: { [key: string]: number | string };
}


export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}