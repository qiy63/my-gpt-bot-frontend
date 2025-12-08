import * as React from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { ChatArea } from "../components/ChatArea";
import "../styles/chat.css";
interface Message {

    type: "user" | "assistant";
    content: string;

}

export default function ChatPage() {

    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
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

        const newMessages = [...messages, {type: "user" as const, content: input}];
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
                    type: "assistant" as const, 
                    content: data.answer ?? "No Response",
                },
            ]);

            setInput("");

        } catch (err) {

            setLoading(false);
            setMessages([

                ...newMessages,
                { type: "assistant" as const, content: "Error: unable to connect to server."}

            ]);

        }

    };

    return (
  <div className="chat-layout flex">
    {/* Sidebar */}
    <Sidebar
      isCollapsed={sidebarCollapsed}
      onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
    />

    {/* Chat Area */}
    <ChatArea
      messages={messages.map((m, i) => ({
        id: i,
        type: m.type, // ensure 'user' or 'assistant'
        content: m.content,
      }))}
      input={input}
      loading={loading}
      setInput={setInput}
      sendMessage={sendMessage}
    />
  </div>
);

}