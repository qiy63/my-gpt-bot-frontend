import * as React from "react";
import { useNavigate } from "react-router";
import "../styles/chat.css";

interface Message {

    role: "user" | "assistant";
    content: string;

}

export default function ChatPage() {

    const navigate = useNavigate();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

    // redirect to login if no token
    React.useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login");

        }

    }, []);

    // auto scroll to bottom
    React.useEffect(() => {

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [messages, loading]);

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    const sendMessage = async () => {

        if (!input.trim()) return;

        const newMessages = [...messages, {role: "user" as const, content: input}];
        setMessages(newMessages);
        setInput("");

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/ask", {

                method: "POST",
                headers: {
                    
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                
                },
                body: JSON.stringify({question: input}),

            });

            const data = await response.json();
            setLoading(false);

            setMessages([
                ...newMessages, {
                    role: "assistant" as const, 
                    content: data.answer ?? "No Response",
                },
            ]);

            setInput("");

        } catch (err) {

            setLoading(false);
            setMessages([

                ...newMessages,
                { role: "assistant" as const, content: "Error: unable to connect to server."}

            ]);

        }

    };

    return (
        <div className="chat-layout">
            {/* Sidebar */}
            <div className="chat-sidebar">
                <div className="sidebar-title">MyPropertyAid</div>

                <div className="sidebar-item" onClick={() => navigate("/profile")}>
                    Profile
                </div>

                <div className="sidebar-item" onClick={() => navigate("/chat")}>
                    Chat
                </div>

                <div className="logout-btn" onClick={logout}>Logout</div>
            </div>

            {/* Main Chat */}
            <div className="chat-container">
                <div className="chat-header">Legal Advice Chatbot</div>

                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${
                                msg.role === "user"
                                    ? "message-user"
                                    : "message-assistant"
                            }`}
                        >
                            {msg.content}
                        </div>
                    ))}

                    {loading && (
                        <div className="typing-indicator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    )}

                    {/* scroll anchor */}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* Input */}
                <div className="chat-input-area">
                    <input
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your legal question..."
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />

                    <button className="send-btn" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

}