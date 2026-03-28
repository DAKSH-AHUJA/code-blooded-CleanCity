import React, { useMemo, useState } from "react";
import logo from "../../assets/logoo.svg";
import { RotateCcw } from "lucide-react";

const INITIAL_BOT_MESSAGE = {
  role: "bot",
  text: "Hi, I am EcoBot. I can help you understand how EcoSync works and guide you in reporting local issues.",
};

const EcoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);

  const quickReply = useMemo(() => {
    const value = input.trim().toLowerCase();
    if (!value) return null;

    if (value.includes("how") && value.includes("ecosync")) {
      return "EcoSync helps people report, track, and follow up on local community issues in one place.";
    }

    if (value.includes("report") || value.includes("complaint")) {
      return "Go to Report Issue, add a clear description, optional image, and location details, then submit your complaint.";
    }

    if (value.includes("track") || value.includes("status")) {
      return "Open your dashboard or complaints section to check status updates and progress.";
    }

    return "I am EcoBot. Ask me about EcoSync, reporting an issue, or tracking complaint status.";
  }, [input]);

  const sendMessage = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: quickReply || "I am EcoBot for EcoSync support." },
    ]);
    setInput("");
  };

  const handleResetChat = () => {
    console.log("EcoBot chat reset");
    setMessages([INITIAL_BOT_MESSAGE]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {isOpen && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="EcoSync logo" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-emerald-900">EcoBot</p>
                <p className="text-xs text-emerald-700">EcoSync Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="rounded-md p-1.5 text-emerald-800 hover:bg-emerald-100"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-emerald-800 hover:bg-emerald-100"
              >
                X
              </button>
            </div>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto bg-emerald-50/40 px-3 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-emerald-600 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="border-t border-emerald-100 p-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
      >
        <img src={logo} alt="EcoSync logo" className="h-5 w-5 rounded-full object-cover" />
        EcoBot
      </button>
    </div>
  );
};

export default EcoBot;
