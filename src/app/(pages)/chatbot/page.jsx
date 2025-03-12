"use client";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

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
    if (!input.trim() || loading) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    if (!apiKey) {
        setMessages((prev) => [
            ...prev,
            {
                text: "API key is missing. Please contact support.",
                sender: "bot",
            },
        ]);
        setLoading(false);
        return;
    }

    try {
        const { data } = await axios.post(
            url,
            {
                contents: [{ parts: [{ text: input }] }],
            },
            { headers: { "Content-Type": "application/json" }, timeout: 10000 }
        );

        const textResponse =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI";
        setMessages((prev) => [...prev, { text: textResponse, sender: "bot" }]);
    } catch (error) {
        const errorMessage = error.response
            ? `Error: ${error.response.data.error.message}`
            : "Network error or timeout. Please try again.";

        setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
    } finally {
        setLoading(false);
    }
};

    const handleNewChat = () => setMessages([]);

    return (
        <div className="w-[75%] rounded-lg p-4 mb-56 bg-transparent">
            <div className="flex justify-end items-center mb-1">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNewChat}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition flex items-center justify-center gap-1"
                >
                    <FaPlus />
                    <h1>New Chat</h1>
                </motion.button>
            </div>

            <div className="h-65 overflow-y-auto p-4 rounded-lg flex flex-col border border-gray-400 shadow-lg">
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="text-gray-500 text-sm self-end"
                    >
                        Typing...
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-2 flex border border-gray-400 rounded-lg overflow-hidden shadow-lg"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 focus:outline-none"
                    disabled={loading}
                />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className={`bg-green-500 text-white px-4 flex items-center justify-center ${
                        loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-green-600 transition"
                    }`}
                    disabled={loading}
                >
                    <FaPaperPlane />
                </motion.button>
            </form>
        </div>
    );
}
