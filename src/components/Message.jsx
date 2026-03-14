import SourcesBadge from './SourcesBadge';
import '../styles/Message.css';

/* ── Thinking indicator ── */
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
          QUERYING MANUAL…
        </div>
      </div>
    </div>
  );
}

/* ── Main message ── */
export default function Message({ role, text, sources, isError }) {
  const isUser = role === 'user';

  return (
    <div className={`msg msg--${isUser ? 'user' : 'ai'}`}>
      <div className="msg__avatar">{isUser ? 'YOU' : 'AI'}</div>

      <div className="msg__wrap">
        <div className={`msg__bubble${isError ? ' msg__bubble--error' : ''}`}>
          {isError && '⚠ '}{text}
        </div>

        {!isUser && !isError && sources?.length > 0 && (
          <SourcesBadge sources={sources} />
        )}
      </div>
    </div>
  );
}
