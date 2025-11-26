import * as React from "react";

interface Message {

    role: "user" | "assistant";
    content: string;

}

export default function ChatPage() {

    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");

    const sendMessage = async () => {

        if (!input.trim()) return;

        const newMessages = [...messages, {role: "user" as const, content: input}];
        setMessages(newMessages);

        const response = await fetch("http://localhost:3000/ask", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({question: input}),

        });

        const data = await response.json();

        setMessages([...newMessages, {
            role: "assistant" as const, 
            content: data.answer || data.reply || "No reply from backend."
        }]);

        setInput("");

    };

    return (

        <div style={{padding: 20, maxWidth:600, margin:"0, auto"}}>

            <h1>MyPropertyAid</h1>

            <div
                style={{

                  height: 400,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                    
                }}
            >

                {messages.map((msg, i) => (

                    <div
                    
                        key={i}
                        style={{

                            textAlign: msg.role === "user" ? "right" : "left",
                            marginBottom: 10,

                        }}
                    
                    >

                        <div
                        
                            style={{

                                display: "inline-block",
                                padding: 10,
                                borderRadius: 10,
                                background: msg.role === "user" ? "#007bff" : "#eee",
                                color: msg.role === "user" ? "white" : "black",

                            }}
                        
                        >
                            {msg.content}
                        </div>

                    </div>

                ))}

            </div>

            <div style={{ display: "flex", gap: 10}}>

                <input
                
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your real estate law question..."
                    style={{

                        flexGrow: 1,
                        padding: 10,
                        borderRadius: 6,
                        border: "1px solid #ccc",

                    }}
                
                />

                <button
                
                    onClick={sendMessage}
                    style={{

                        padding: "10px 15px",
                        borderRadius: 6,
                        background: "#007bff",
                        color: "white",

                    }}

                >

                    Send

                </button>

            </div>

        </div>

    );

}