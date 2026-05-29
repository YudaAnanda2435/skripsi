import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Kamu adalah asisten AI khusus pertanian cabai rawit bernama "AgroBot". 
Kamu HANYA boleh menjawab pertanyaan yang berkaitan dengan topik-topik berikut:
- Budidaya dan penanaman cabai rawit
- Estimasi dan prediksi panen cabai rawit
- Pengendalian hama dan penyakit cabai rawit
- Pemupukan dan perawatan tanaman cabai rawit
- Panen dan pasca panen cabai rawit
- Harga dan pemasaran cabai rawit
- Kondisi cuaca dan pengaruhnya terhadap cabai rawit
- Sistem tebasan, borongan, dan penjualan cabai rawit
- Penggunaan aplikasi Chili Vision / AgroCount untuk prediksi panen

Jika pengguna bertanya di luar topik pertanian cabai rawit, tolak dengan sopan dan arahkan kembali ke topik tersebut.
Jawab dalam Bahasa Indonesia yang ramah dan mudah dipahami petani. 
Berikan jawaban yang praktis dan langsung to the point. Gunakan poin-poin jika diperlukan.`;

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya **Chili Bot** 🌶️, asisten AI khusus pertanian cabai rawit Anda. Saya siap membantu pertanyaan seputar budidaya, estimasi panen, hama, pemupukan, hingga pemasaran cabai rawit. Ada yang bisa saya bantu?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const puterReady = useRef(false);

  // Load puter.js script dynamically
  useEffect(() => {
    if (window.puter) {
      puterReady.current = true;
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => {
      puterReady.current = true;
    };
    document.head.appendChild(script);
    return () => {
      // don't remove on unmount; keep cached
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Lock body scroll when chat open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const buildMessages = (history, userMessage) => {
    const systemMsg = { role: "system", content: SYSTEM_PROMPT };
    const historyMsgs = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    return [systemMsg, ...historyMsgs, { role: "user", content: userMessage }];
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    // Optimistic placeholder for streaming
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isStreaming: true },
    ]);

    try {
      const apiMessages = buildMessages(messages, trimmed);
      const response = await window.puter.ai.chat(apiMessages, {
        stream: true,
        model: "gpt-4o-mini",
      });

      let fullText = "";
      for await (const chunk of response) {
        const delta = chunk?.text ?? "";
        fullText += delta;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: fullText,
            isStreaming: true,
          };
          return copy;
        });
      }

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: fullText,
          isStreaming: false,
        };
        return copy;
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.",
          isStreaming: false,
          isError: true,
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderContent = (text) => {
    // Simple markdown: bold, line breaks
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* ===== OVERLAY ===== */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[998] transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ===== SLIDE-IN CHAT PANEL ===== */}
      <div
        className={`fixed top-0 right-0 h-screen w-[92vw] md:w-[28vw] min-w-[300px] max-w-[420px] z-[999] flex flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(160deg, #f8fff8 0%, #ffffff 40%, #f0faf5 100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-gray-100"
          style={{
            background: "linear-gradient(135deg, #519a66 0%, #3d7a50 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-bold shadow-inner">
              🌶️
            </div>
            <div>
              <h3 className="text-white font-semibold text-[15px] leading-tight">
                Chili Bot
              </h3>
              <p className="text-green-100 text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block animate-pulse"></span>
                Ahli Cabai Rawit
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Topic hint bar */}
        <div className="px-5 py-2.5 bg-green-50 border-b border-green-100 flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-green-500 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-[11px] text-green-700 leading-snug">
            Khusus seputar <strong>budidaya & estimasi panen</strong> cabai
            rawit
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 scroll-smooth">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {/* Avatar AI */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-sm shrink-0 mt-0.5">
                  🌶️
                </div>
              )}

              <div
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : msg.isError
                      ? "bg-red-50 text-red-700 border border-red-200 rounded-tl-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: renderContent(msg.content),
                      }}
                    />
                    {msg.isStreaming && (
                      <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse ml-0.5 rounded-sm align-middle" />
                    )}
                  </>
                ) : (
                  msg.content
                )}
              </div>

              {/* Avatar User */}
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-sm shrink-0">
                🌶️
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {[
              "Cara menanam cabai rawit?",
              "Hama yang menyerang cabai?",
              "Estimasi hasil panen?",
              "Cara pemupukan cabai?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInputValue(q);
                  setTimeout(() => inputRef.current?.focus(), 100);
                }}
                className="px-3 py-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-[11.5px] rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="px-4 pb-5 pt-3 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan seputar cabai rawit..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-[13.5px] text-gray-800 placeholder-gray-400 outline-none leading-relaxed max-h-28 disabled:opacity-60"
              style={{ minHeight: "24px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 112) + "px";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Tekan Enter untuk kirim · Shift+Enter untuk baris baru
          </p>
        </div>
      </div>

      {/* ===== FLOATING TRIGGER BUTTON ===== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[997]">
        <button
          id="ai-chat-trigger"
          onClick={() => setIsOpen(true)}
          className={`group flex items-center gap-2.5 cursor-pointer transition-all duration-500 ${
            isOpen
              ? "opacity-0 pointer-events-none translate-x-2"
              : "opacity-100 translate-x-0"
          }`}
          style={{
            background: "linear-gradient(135deg, #519a66 0%, #3d7a50 100%)",
            borderRadius: "10px 0 0 10px",
            padding: "14px 12px 14px 14px",
            boxShadow: "-4px 4px 20px rgba(81, 154, 102, 0.4)",
          }}
        >
          {/* Icon + label vertically */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🌶️</span>
            <span
              className="text-white font-semibold text-[11px] tracking-wide"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                letterSpacing: "0.08em",
              }}
            >
              Tanya AI
            </span>
          </div>

          {/* Ping indicator */}
          <span className="absolute -top-1 -left-1 w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
          </span>
        </button>
      </div>
    </>
  );
};

export default AiChat;
