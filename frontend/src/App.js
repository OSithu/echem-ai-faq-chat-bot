import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "What is e-Chem and when was it established?",
    "What services does e-Chem provide for A/L Chemistry students?",
    "How does e-Chem communicate with its students?",
    "What online portals are available for e-Chem students?",
    "Who are the target students of e-Chem?",
    "How many physical exam centers does e-Chem operate islandwide?"
  ];

  // Format bot responses with better structure
  const formatBotResponse = (text) => {
    // Check if it's a list of locations (contains asterisks and locations)
    if (text.includes('*') && (text.includes('location') || text.toLowerCase().includes('center'))) {
      const lines = text.split('*').filter(line => line.trim());
      
      return (
        <div>
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (trimmed) {
              // Check if it contains parentheses (location with code)
              const match = trimmed.match(/^(.+?)\s*\((.+?)\)/);
              if (match) {
                return (
                  <div key={idx} className="location-item">
                    <strong>{match[1].trim()}</strong> ({match[2].trim()})
                  </div>
                );
              }
              return <div key={idx} className="location-item">{trimmed}</div>;
            }
            return null;
          })}
        </div>
      );
    }

    // Check if it contains bullet points or numbered items
    if (text.includes('\n') && (text.match(/^\s*[-•*]/m) || text.match(/^\s*\d+\./m))) {
      const items = text.split('\n').filter(line => line.trim());
      return (
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {item.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')}
            </li>
          ))}
        </ul>
      );
    }

    // For regular text, preserve paragraphs
    return text.split('\n\n').map((paragraph, idx) => (
      <p key={idx} style={{ margin: '8px 0' }}>
        {paragraph}
      </p>
    ));
  };

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', { message: textToSend });
      const botMsg = { role: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Error connecting to server.' }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="header-content">
            <div>
              <h2>e-Chem Chatbot</h2>
              <p>Ask anything about chemistry and results</p>
            </div>
            {messages.length > 0 && (
              <button className="reset-button" onClick={handleReset} title="Reset conversation">
                ↻
              </button>
            )}
          </div>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <p style={{ fontSize: '16px' }}>Welcome to e-Chem Chatbot!</p>
              <p style={{ fontSize: '13px' }}>Start a conversation by typing your question or selecting one below.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                <div className="message-bubble">
                  {msg.role === 'bot' ? formatBotResponse(msg.text) : msg.text}
                </div>
              </div>
            ))
          )}
          {loading && <div className="loading-indicator">e-Chem is thinking...</div>}
        </div>

        {messages.length === 0 && (
          <div className="quick-questions">
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px', textAlign: 'center' }}>Quick Questions:</p>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-area">
          <input 
            type="text"
            className="message-input"
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about centers or results..." 
            disabled={loading}
          />
          <button 
            className="send-button" 
            onClick={() => sendMessage()}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;