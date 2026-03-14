import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
        </svg>
      </div>

      <div className="header__title">
        <h1>VR Instructor</h1>
        <p>FIELD MANUAL INTELLIGENCE SYSTEM // RAG-ENABLED</p>
      </div>

      <div className="header__status">
        <div className="status-dot" />
        SYSTEM ONLINE
      </div>
    </header>
  );
}
