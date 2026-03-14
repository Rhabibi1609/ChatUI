// SourcesBadge — individual source buttons that reveal content on hover
export default function SourcesBadge({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="sources-list">
      {sources.map((src, i) => {
        // Handle object formats (e.g. { name: '...', content: '...' } or { page: 151, content: '...' }) or plain string
        const isObj = typeof src === 'object' && src !== null;
        const label = isObj 
          ? (src.name || (src.page ? `Page ${src.page}` : `Source ${i + 1}`))
          : (src ? src : `Source ${i + 1}`);
        const content = isObj
          ? (src.content || src.name || JSON.stringify(src))
          : src;

        return (
          <div className="source-btn-wrapper" key={src.id || i}>
            <button className="source-btn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              {label}
            </button>
            <div className="source-tooltip">
              <div className="source-tooltip__heading">{label}</div>
              <div className="source-tooltip__content">{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
