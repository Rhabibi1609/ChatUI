import '../styles/ConfigBar.css';

export default function ConfigBar({ serverUrl, apiKey, onServerChange, onApiKeyChange }) {
  return (
    <div className="config-bar">
      <span className="config-bar__label">SERVER</span>
      <input
        className="config-bar__input config-bar__input--url"
        type="text"
        value={serverUrl}
        onChange={e => onServerChange(e.target.value)}
        placeholder="http://localhost:8080"
        spellCheck={false}
      />
      <span className="config-bar__sep">|</span>
      <span className="config-bar__label">API KEY</span>
      <input
        className="config-bar__input config-bar__input--key"
        type="password"
        value={apiKey}
        onChange={e => onApiKeyChange(e.target.value)}
        placeholder="x-api-key value"
      />
    </div>
  );
}
