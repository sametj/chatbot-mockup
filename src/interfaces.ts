type ChatType = "UserChat" | 'BotChat';

export interface Query {
  id: string;
  content: string;
  type: ChatType
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