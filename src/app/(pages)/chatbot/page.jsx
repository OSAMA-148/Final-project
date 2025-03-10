"use client";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: input }] }],
                }),
            });

            const data = await res.json();
            console.log("API Response:", data);
            setLoading(false);

            if (data.error) {
                setMessages([
                    ...messages,
                    newMessage,
                    { text: `Error: ${data.error.message}`, sender: "bot" },
                ]);
                return;
            }

            const textResponse =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response from AI";
            setMessages([
                ...messages,
                newMessage,
                { text: textResponse, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false);
            setMessages([
                ...messages,
                newMessage,
                { text: "Error fetching response.", sender: "bot" },
            ]);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
    };

    return (
        <div className="w-[80%] mx-auto bg-transparent rounded-lg p-4 mb-34">
            <div className="flex justify-end items-center mb-2">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNewChat}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition flex items-center justify-center gap-1"
                >
                    <FaPlus />
                    <h1>New Chat</h1>
                </motion.button>
            </div>
            <div className="h-40 overflow-y-auto p-4 rounded-lg flex flex-col border border-gray-400">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`mb-1 p-3 rounded-lg max-w-1/2 ${
                            msg.sender === "user"
                                ? "bg-blue-300 self-start"
                                : "bg-blue-400 self-end"
                        }`}
                    >
                        {msg.text}
                    </motion.div>
                ))}
                {loading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="text-gray-500 text-sm self-end"
                    >
                        Loading...
                    </motion.p>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSubmit}
                className="mt-4 flex border border-gray-400 rounded-lg overflow-hidden"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 focus:outline-none"
                />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="bg-green-500 text-white px-4 flex items-center justify-center hover:bg-green-600 transition"
                >
                    <FaPaperPlane />
                </motion.button>
            </form>
        </div>
    );
}
