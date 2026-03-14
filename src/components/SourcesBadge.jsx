// SourcesBadge — hover to reveal manual page references
export default function SourcesBadge({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="sources-badge">
      {/* info icon */}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
      {sources.length} source{sources.length !== 1 ? 's' : ''}

      <div className="sources-tooltip">
        <div className="sources-tooltip__heading">Manual References</div>
        {sources.map((src, i) => (
          <div className="source-item" key={i}>
            <span className="source-item__arrow">›</span>
            {src}
          </div>
        ))}
      </div>
    </div>
  );
}
