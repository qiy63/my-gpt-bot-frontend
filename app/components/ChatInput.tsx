interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (content: string) => void;
}

export function ChatInput({ input, setInput, onSendMessage }: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="border-t border-indigo-100 bg-white/80 backdrop-blur-sm px-6 py-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about property law..."
            className="w-full px-6 py-4 rounded-2xl border border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all bg-white/90"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
