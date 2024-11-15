import ReactMarkdown from "react-markdown";

export default function InsightsContainer({ insights }: { insights: string }) {
  return (
    <details className="collapse collapse-arrow bg-base-100 p-8">
      <summary className="collapse-title text-xl font-bold">
        Show Insights
      </summary>
      <div className="collapse-content">
        <ReactMarkdown>{insights}</ReactMarkdown>
      </div>
    </details>
  );
}
