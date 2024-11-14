import React from "react";

type ChatType = "UserChat" | 'BotChat';

export interface Query {
  id: string;
  content: string | object;
  type: ChatType
  insights?: string | React.ReactNode;
  isPinned?: boolean
}


export interface DataType {
  [key: string]: { [key: string]: number | string };
}

export interface FileValidation {
  name: string;
  type: string;
  size: number;
}

export interface TextBoxProps {
  queries: Query[];
  setQueries: React.Dispatch<React.SetStateAction<Query[]>>;
  setIsLoading: (bool: boolean) => void;
}
export interface ChatHistoryProps {
  chatHistory: Query[];
  setChatHistory: React.Dispatch<React.SetStateAction<Query[]>>;
}
