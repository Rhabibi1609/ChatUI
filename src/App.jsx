import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ConfigBar from './components/ConfigBar';
import Message, { ThinkingMessage } from './components/Message';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInput from './components/ChatInput';
import { sendChat } from './api/chatApi';
import './styles/global.css';

// Chat log area styles (layout only — keeps component CSS minimal)
const logStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  scrollBehavior: 'smooth',
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
};

export default function App() {
  const [serverUrl, setServerUrl] = useState('https://vr-instructor-api.jollyfield-da87f58f.westus3.azurecontainerapps.io');
  const [apiKey, setApiKey] = useState('cutr12!@');
  const [messages, setMessages] = useState([]);   // { id, role, text, sources?, isError? }
  const [thinking, setThinking] = useState(false);
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const logRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const addMessage = (msg) =>
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), ...msg }]);

  const handleSend = async (text) => {
    addMessage({ role: 'user', text });
    setThinking(true);

    try {
      const { response, sources } = await sendChat(text, serverUrl, apiKey);
      addMessage({ role: 'ai', text: response, sources });
    } catch (err) {
      addMessage({
        role: 'ai',
        text: `Connection failed — is the server running at ${serverUrl}? (${err.message})`,
        isError: true,
      });
    } finally {
      setThinking(false);
    }
  };

  return (
    <div style={appStyle}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ConfigBar
        serverUrl={serverUrl}
        apiKey={apiKey}
        onServerChange={setServerUrl}
        onApiKeyChange={setApiKey}
      />

      {/* Chat log */}
      <div ref={logRef} style={logStyle}>
        {messages.length === 0 && !thinking ? (
          <WelcomeScreen onSuggestion={handleSend} />
        ) : (
          <>
            {messages.map(msg => (
              <Message
                key={msg.id}
                role={msg.role}
                text={msg.text}
                sources={msg.sources}
                isError={msg.isError}
              />
            ))}
            {thinking && <ThinkingMessage />}
          </>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={thinking} />
    </div>
  );
}
