import { Query } from "@/interfaces";
import { Fragment, useRef, useState } from "react";
import { BotChat, UserChat } from "./ChatTypes";
import TextBox from "./TextBox";

export default function Chat() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  // const chat = getLocalStorage();

  return (
    <section className="mx-20 flex w-full flex-col bg-base-300">
      <div
        ref={chatRef}
        className="relative mx-auto mt-5 flex h-4/5 w-4/5 max-w-800 flex-col items-center gap-20 overflow-auto"
      >
        {queries.map((query) => (
          <Fragment key={query.id}>
            {query.type === "UserChat" ? (
              <UserChat text={query.content} />
            ) : (
              <BotChat text={query.content} />
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
