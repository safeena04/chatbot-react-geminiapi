import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("Your_Api_Key");

export const Chatbot = () => {
  const [input, setInput] = useState("");

  // Load chat history before render
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  // Auto-scroll reference
  const bottomRef = useRef(null);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(input);
      const botReply = result.response.text();

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      console.log("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error generating response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Gemini Chatbot</h2>

      <div
        style={{
          background: "#242222ff",
          padding: "10px",
          minHeight: "300px",
          borderRadius: "10px",
          overflowY: "auto",
          maxHeight: "60vh",
        }}
      >
      {/* <div
  style={{
    background: "#413d3dff",
          padding: "10px",
          minHeight: "300px",
          borderRadius: "10px",
          overflowY: "auto",
          maxHeight: "60vh",
 
    width: "60%",          // Take 60% of screen width
    margin: "0 auto",      // Center it horizontally
         // Optional: make it taller
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    border: "1px solid #ccc", // Optional: just to see the container

        // Optional: make background white
  }}
> */}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                padding: "10px",
                borderRadius: "12px",
                maxWidth: "60%",
                background: msg.role === "user" ? "#5f656bff" : "#434a52ff",
                color: msg.role === "user" ? "white" : "white",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p style={{ marginTop: "10px" }}>Answer is loading...</p>
        )}

        {/* Auto-scroll anchor */}
        <div ref={bottomRef}></div>
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Gemini..."
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#4c4f53ff",
            color: "white",
            borderRadius: "8px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;




