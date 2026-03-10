import '../styles/Welcome.css';

const SUGGESTIONS = [
  { tag: 'Operations', q: 'How do I operate an automatic switch by hand?' },
  { tag: 'Signals',    q: 'What are the signal rules for yard movement?' },
  { tag: 'Safety',     q: 'What is the procedure for emergency brake application?' },
  { tag: 'Procedures', q: 'How do I handle a train stalled on a grade?' },
];

export default function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="welcome">
      <div className="welcome__icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      </div>

      <h2 className="welcome__title">Field Manual Assistant</h2>
      <p className="welcome__sub">
        Ask any operational question. The system retrieves context from the
        instructor manual and provides sourced answers with page references.
      </p>

      <div className="welcome__grid">
        {SUGGESTIONS.map(({ tag, q }) => (
          <button key={q} className="suggestion" onClick={() => onSuggestion(q)}>
            <span className="suggestion__tag">{tag}</span>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
