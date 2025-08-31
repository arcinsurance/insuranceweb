import React, { useState, useRef, useEffect } from 'react';
import { getAIResponseStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 text-gray-800 ${
          isUser
            ? 'bg-brand-blue text-white rounded-br-none'
            : 'bg-gray-200 text-brand-dark rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setMessages([{ role: 'model', text: 'Hello! How can I help you learn about our insurance and travel services today?' }]);
    }
  }, [isOpen]);
  
  useEffect(scrollToBottom, [messages]);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let fullResponse = '';
    let modelMessageIndex = -1;

    try {
        const stream = getAIResponseStream(input);
        for await (const chunk of stream) {
            fullResponse += chunk.text;
            if (modelMessageIndex === -1) {
                // First chunk, create new message
                setMessages(prev => {
                    modelMessageIndex = prev.length;
                    return [...prev, { role: 'model', text: fullResponse }];
                });
            } else {
                // Subsequent chunks, update existing message
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[modelMessageIndex] = { role: 'model', text: fullResponse };
                    return newMessages;
                });
            }
        }
    } catch (error) {
        console.error("Streaming failed:", error);
        setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          aria-label="Open AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out origin-bottom-right transform scale-100">
          <header className="bg-brand-blue text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <main className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-gray-200 text-brand-dark rounded-2xl rounded-bl-none px-4 py-2 flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>

          <footer className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ''}
                className="bg-brand-blue text-white rounded-full p-3 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default AIAssistant;