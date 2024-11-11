import ReactMarkdown from "react-markdown";

export default function InsightsContainer({ insights }: { insights: string }) {
  return (
    <details className="collapse">
      <summary className="collapse-title text-xl font-medium">Insights</summary>
      <div className="collapse-content">
        <ReactMarkdown>{insights}</ReactMarkdown>
      </div>
    </details>
  );
}
