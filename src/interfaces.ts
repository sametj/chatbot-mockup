import React from "react";

type ChatType = "UserChat" | 'BotChat';

export interface Query {
  id: string;
  content: string | object;
  type: ChatType
  insights?: string | React.ReactNode;
}


export interface DataType {
  [key: string]: { [key: string]: number | string };
}


