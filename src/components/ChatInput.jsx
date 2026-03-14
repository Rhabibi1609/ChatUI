import { useRef, useEffect } from 'react';
import '../styles/ChatInput.css';

export default function ChatInput({ onSend, disabled }) {
  const ref = useRef(null);

  // Auto-resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 130) + 'px';
  });

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    const text = ref.current?.value.trim();
    if (!text || disabled) return;
    onSend(text);
    ref.current.value = '';
    ref.current.style.height = 'auto';
  };

  return (
    <div className="chat-input">
      <div className="chat-input__row">
        <textarea
          ref={ref}
          className="chat-input__textarea"
          rows={1}
          placeholder="Ask the manual a question…"
          maxLength={2000}
          onKeyDown={handleKey}
          disabled={disabled}
        />
        <button
          className="chat-input__send"
          onClick={submit}
          disabled={disabled}
          title="Send (Enter)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
      <p className="chat-input__hint">
        ENTER to send &nbsp;·&nbsp; SHIFT+ENTER for newline &nbsp;·&nbsp;
        Hover ⊕ badge to see source references
      </p>
    </div>
  );
}
