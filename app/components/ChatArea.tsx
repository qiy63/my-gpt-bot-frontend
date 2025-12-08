import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  input: string;
  loading: boolean;
  setInput: (value: string) => void;
  sendMessage: (message: string) => void;
}

export function ChatArea({
  messages,
  input,
  loading,
  setInput,
  sendMessage,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 px-6 py-4">
        <h2 className="text-indigo-950">Property Legal Assistant</h2>
        <p className="text-sm text-indigo-600/70">
          Ask me anything about property law and legal procedures
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex gap-2">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <ChatInput input={input} setInput={setInput} onSendMessage={sendMessage} />
    </div>
  );
}
