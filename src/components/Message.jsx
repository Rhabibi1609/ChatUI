import React from 'react';
import SourcesBadge from './SourcesBadge';
import '../styles/Message.css';

function CitationIcon({ numbers, sources }) {
  return (
    <span className="inline-citations" style={{ display: 'inline-flex', gap: '4px', verticalAlign: 'middle', margin: '0 4px' }}>
      {numbers.map((num, idx) => {
        let src = null;
        if (sources && sources.length > 0) {
           src = sources.find(s => s.id === num) || sources[num - 1];
        }
        
        const isObj = typeof src === 'object' && src !== null;
        const label = isObj 
          ? (src.name || (src.page ? `Page ${src.page}` : `Source ${num}`))
          : (src ? src : `Source ${num}`);
        const content = isObj
          ? (src.content || src.name || JSON.stringify(src))
          : src;

        return (
          <span className="source-btn-wrapper" key={idx}>
            <span className="source-btn" style={{ padding: '2px 6px', fontSize: '12px', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              <span>{num}</span>
            </span>
            {src && (
              <div className="source-tooltip" style={{ left: '50%', transform: 'translateX(-50%) translateY(5px)', bottom: 'calc(100% + 4px)' }}>
                <div className="source-tooltip__heading">{label}</div>
                <div className="source-tooltip__content">{content}</div>
              </div>
            )}
          </span>
        );
      })}
    </span>
  );
}

function formatTextWithCitations(text, sources) {
  if (!text) return text;
  
  const regex = /\[([\d,\s]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    const numsStr = match[1];
    const numbers = numsStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    
    parts.push(<CitationIcon key={match.index} numbers={numbers} sources={sources} />);
    
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts;
}

/* -- Thinking indicator -- */
export function ThinkingMessage() {
  return (
    <div className="msg msg--ai">
      <div className="msg__avatar">AI</div>
      <div className="msg__wrap">
        <div className="thinking">
          <div className="thinking__dots">
            <span className="thinking__dot" />
            <span className="thinking__dot" />
            <span className="thinking__dot" />
          </div>
          QUERYING MANUAL...
        </div>
      </div>
    </div>
  );
}

/* -- Main message -- */
export default function Message({ role, text, sources, isError }) {
  const isUser = role === 'user';

  return (
    <div className={`msg msg--${isUser ? 'user' : 'ai'}`}>
      <div className="msg__avatar">{isUser ? 'YOU' : 'AI'}</div>

      <div className="msg__wrap">
        <div className={`msg__bubble${isError ? ' msg__bubble--error' : ''}`}>
          {isError && '[ERROR] '}
          {isUser || isError ? text : formatTextWithCitations(text, sources)}
        </div>

        {!isUser && !isError && sources?.length > 0 && (
          <SourcesBadge sources={sources} />
        )}
      </div>
    </div>
  );
}
