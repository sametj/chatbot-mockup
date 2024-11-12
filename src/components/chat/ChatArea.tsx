import { DataType, Query } from "@/interfaces";
import { Fragment, useRef, useState } from "react";
import Chart from "../Chart";
import Table from "../Table";
import { BotChat, UserChat } from "./ChatTypes";
import TextBox from "./TextBox";

export default function Chat() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  // const chat = getLocalStorage();

  return (
    <section className="mx-20 my-20 flex w-full flex-col rounded-2xl bg-gradient-to-b from-base-100 from-60% to-[#5427fc]/20 to-100% shadow-lg">
      <div
        ref={chatRef}
        className="relative mx-auto mt-5 flex h-4/5 w-4/5 max-w-800 flex-col items-center gap-20 overflow-auto"
      >
        {queries.map((query) => (
          <Fragment key={query.id}>
            {query.type === "UserChat" ? (
              <UserChat
                text={typeof query.content === "string" ? query.content : ""}
              />
            ) : typeof query.content === "object" ? (
              <BotChat>
                <Table data={query.content as DataType} />
                <Chart data={query.content as DataType} />
                {query.insights}
              </BotChat>
            ) : (
              <BotChat content={query.content as string} />
            )}
          </Fragment>
        ))}

        {isLoading && (
          <div className="chat-bubble self-start">
            <span className="loading loading-dots loading-sm"></span>
          </div>
        )}
      </div>
      <TextBox
        queries={queries}
        setIsLoading={setIsLoading}
        setQueries={setQueries}
      />
    </section>
  );
}
