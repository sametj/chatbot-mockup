type ChatType = "UserChat" | 'BotChat';

export interface Query {
  id: string;
  content: string;
  type: ChatType
}