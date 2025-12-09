// import { useState } from 'react';
// import { GoogleGenAI } from "@google/genai";
// export const Chatbot = () => {
//     const [input, setInput] = useState('');
//   const [answer, setAnswer] = useState('');

//   // Initialize AI client – replace YOUR_API_KEY_HERE with your key
//   const ai = new GoogleGenAI({ apiKey: "AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY" });

//   async function generateAnswer() {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: input,
//     });
//     setAnswer(response.text);
//     console.log(response.text);
//   }

//   return (
//     <div>
//       <h1>ChatBot AI</h1>
//       <textarea value={input}></textarea><br />
//       <input 
//         type="text" 
//         value={input} 
//         onChange={(e) => setInput(e.target.value)} 
//         placeholder="Type your question"
//       />
//       <button onClick={generateAnswer}>Generate Answer</button>
//       <p>{answer}</p>
//     </div>
//   );
// }





// import { useState } from "react";
// import { GoogleGenAI } from "@google/genai";

// export const Chatbot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Initialize Gemini
//   const ai = new GoogleGenAI({
//     apiKey: "AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY",   // ← PUT YOUR API KEY HERE
//   });

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     const prompt = input;
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//       });

//       // Correct extraction of text
//       const aiText =
//         response?.text() || "No answer received. Check API key or request.";

//       const botMsg = { sender: "ai", text: aiText };

//       setMessages((prev) => [...prev, botMsg]);
//     } catch (error) {
//       console.error(error);

//       const errorMsg = {
//         sender: "ai",
//         text: "❗ Error generating response. Check console.",
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         background: "#f0f0f0",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           padding: "15px",
//           background: "#ffffff",
//           boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//           fontSize: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         Gemini Chatbot
//       </div>

//       {/* Chat Window */}
//       <div
//         style={{
//           flex: 1,
//           padding: "20px",
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               justifyContent:
//                 msg.sender === "user" ? "flex-end" : "flex-start",
//             }}
//           >
//             <div
//               style={{
//                 background: msg.sender === "user" ? "#007bff" : "#e5e5e5",
//                 color: msg.sender === "user" ? "#fff" : "#000",
//                 padding: "10px 14px",
//                 borderRadius: "12px",
//                 maxWidth: "70%",
//                 wordBreak: "break-word",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {/* AI is typing... */}
//         {loading && (
//           <div style={{ color: "#666", fontStyle: "italic" }}>
//             Gemini is typing…
//           </div>
//         )}
//       </div>

//       {/* Input Bar */}
//       <div
//         style={{
//           padding: "10px",
//           background: "#ffffff",
//           display: "flex",
//           gap: "10px",
//           borderTop: "1px solid #ccc",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Message Gemini..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "10px",
//             border: "1px solid #ccc",
//             outline: "none",
//           }}
//         />

//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 18px",
//             borderRadius: "10px",
//             background: "#007bff",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };



// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

// export const Chatbot=() => {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     try {
//       // Save user message
//       const newUserMessage = { role: "user", text: input };
//       setMessages((prev) => [...prev, newUserMessage]);

//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const result = await model.generateContent(input);
//       const botMessage = result.response.text(); // ★ FIXED

//       const newBotMessage = { role: "bot", text: botMessage };

//       setMessages((prev) => [...prev, newBotMessage]);
//       setOutput(botMessage);
//       setInput("");
//     } catch (error) {
//       console.error("Gemini Error:", error);

//       const errMsg = {
//         role: "bot",
//         text: " Error generating response. Check console.",
//       };

//       setMessages((prev) => [...prev, errMsg]);
//       setOutput("Error generating response.");
//     }
//   };

//   return (
//     <div>
//       <h2>Gemini Chatbot</h2>

//       <div style={{ background: "#363131ff", padding: "10px", minHeight: "200px" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
//             {msg.text}
//           </p>
//         ))}
//       </div>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Message Gemini..."
//       />

//       <button onClick={sendMessage}>Send</button>

//       {/* <h3>Output:</h3>
//       <p>{output}</p> */}
//     </div>
//   );
// }

// export default Chatbot;


// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

// export const Chatbot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newUserMessage = { role: "user", text: input };
//     setMessages((prev) => [...prev, newUserMessage]);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const result = await model.generateContent(input);
//       const botMessage = result.response.text();

//       const newBotMessage = { role: "bot", text: botMessage };
//       setMessages((prev) => [...prev, newBotMessage]);

//       setInput("");
//     } catch (error) {
//       console.error("Gemini Error:", error);
//       const err = { role: "bot", text: "Error generating response." };
//       setMessages((prev) => [...prev, err]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Gemini Chatbot</h2>

//       {/* CHAT AREA */}
//       <div
//         style={{
//           background: "#f0f0f0",
//           padding: "10px",
//           minHeight: "300px",
//           borderRadius: "10px",
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "12px",
//                 maxWidth: "70%",
//                 background: msg.role === "user" ? "#007bff" : "#e4e4e4",
//                 color: msg.role === "user" ? "white" : "black",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* INPUT */}
//       <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Message Gemini..."
//           style={{
//             padding: "10px",
//             flexGrow: 1,
//             borderRadius: "8px",
//             border: "1px solid gray",
//           }}
//         />

//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#007bff",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




// import { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

// export const Chatbot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Load chat history on first render
//   useEffect(() => {
//     const stored = localStorage.getItem("chatHistory");
//     if (stored) {
//       setMessages(JSON.parse(stored));
//     }
//   }, []);

//   // Save chat history whenever messages change
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(messages));
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const result = await model.generateContent(input);
//       const botReply = result.response.text();

//       const botMsg = { role: "bot", text: botReply };
//       setMessages((prev) => [...prev, botMsg]);

//       setInput("");
//     } catch (error) {
//       console.log("Gemini Error:", error);

//       const err = {
//         role: "bot",
//         text: "⚠️ Error generating response. Check console.",
//       };
//       setMessages((prev) => [...prev, err]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Gemini Chatbot</h2>

//       {/* CHAT AREA */}
//       <div
//         style={{
//           background: "#f0f0f0",
//           padding: "10px",
//           minHeight: "300px",
//           borderRadius: "10px",
//           overflowY: "auto",
//           maxHeight: "60vh",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: "flex",
//               justifyContent:
//                 msg.role === "user" ? "flex-end" : "flex-start",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "12px",
//                 maxWidth: "70%",
//                 background: msg.role === "user" ? "#007bff" : "#e4e4e4",
//                 color: msg.role === "user" ? "white" : "black",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* INPUT AREA */}
//       <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Message Gemini..."
//           style={{
//             flexGrow: 1,
//             padding: "10px",
//             border: "1px solid gray",
//             borderRadius: "8px",
//           }}
//         />

//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#007bff",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



// import { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

// export const Chatbot = () => {
//   const [input, setInput] = useState("");

//   // FIX: Load localStorage BEFORE first render
//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem("chatHistory");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Save chat history on change
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(messages));
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const result = await model.generateContent(input);
//       const botReply = result.response.text();

//       const botMsg = { role: "bot", text: botReply };
//       setMessages((prev) => [...prev, botMsg]);

//       setInput("");
//     } catch (error) {
//       console.log("Gemini Error:", error);

//       const err = { role: "bot", text: "⚠️ Error generating response." };
//       setMessages((prev) => [...prev, err]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>Gemini Chatbot</h2>

//       <div
//         style={{
//           background: "#f0f0f0",
//           padding: "10px",
//           minHeight: "300px",
//           borderRadius: "10px",
//           overflowY: "auto",
//           maxHeight: "60vh",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: "flex",
//               justifyContent:
//                 msg.role === "user" ? "flex-end" : "flex-start",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "12px",
//                 maxWidth: "70%",
//                 background: msg.role === "user" ? "#007bff" : "#e4e4e4",
//                 color: msg.role === "user" ? "white" : "black",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Message Gemini..."
//           style={{
//             flexGrow: 1,
//             padding: "10px",
//             border: "1px solid gray",
//             borderRadius: "8px",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#007bff",
//             color: "white",
//             borderRadius: "8px",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




// import { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

// export const Chatbot = () => {
//   const [input, setInput] = useState("");

//   // Load chat history from localStorage
//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem("chatHistory");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Loading state
//   const [loading, setLoading] = useState(false);

//   // Save chat history whenever messages change
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(messages));
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     setLoading(true); // show loading text

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//       const result = await model.generateContent(input);
//       const botReply = result.response.text();

//       const botMsg = { role: "bot", text: botReply };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (error) {
//       console.log("Gemini Error:", error);

//       const err = { role: "bot", text: "⚠️ Error generating response." };
//       setMessages((prev) => [...prev, err]);
//     }

//     setLoading(false); // hide loading text after answer arrives
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>Gemini Chatbot</h2>

//       <div
//         style={{
//           background: "#352f2fff",
//           padding: "10px",
//           minHeight: "600px",
//           borderRadius: "10px",
//           overflowY: "auto",
//           maxHeight: "60vh",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: "flex",
//               justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "12px",
//                 maxWidth: "70%",
//                 background: msg.role === "user" ? "#007bff" : "#e4e4e4",
//                 color: msg.role === "user" ? "white" : "black",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {/* 🟡 SHOW "Answer is loading..." */}
//         {loading && (
//           <p style={{ textAlign: "left", marginTop: "10px" }}>
//             Answer is loading...
//           </p>
//         )}
//       </div>

//       <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Message Gemini..."
//           style={{
//             flexGrow: 1,
//             padding: "10px",
//             border: "1px solid gray",
//             borderRadius: "8px",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             padding: "10px 20px",
//             background: "#007bff",
//             color: "white",
//             borderRadius: "8px",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDcdiHGvcZ4gMezrf4dz6TslftaYEJzgTY");

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




