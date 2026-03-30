"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OPENING = "Tell me about your business or project — what are you trying to build or improve?";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function BriefCard({ brief, onSend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto mt-6"
    >
      <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-xl bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 px-6 py-5">
          <p className="text-sky-100 text-xs font-bold tracking-widest uppercase mb-1">Project Brief</p>
          <h3 className="text-white text-2xl font-bold">{brief.title}</h3>
          <p className="text-sky-100 text-sm mt-2 leading-relaxed">{brief.summary}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Scope */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Scope</p>
            <ul className="space-y-1.5">
              {brief.scope.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-sky-500 mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-lg">⏱</span>
            <div>
              <p className="text-xs text-gray-400 font-medium">Estimated timeline</p>
              <p className="text-sm font-semibold text-gray-800">{brief.timeline}</p>
            </div>
          </div>

          {/* Relevant work */}
          {brief.examples?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Similar work</p>
              <div className="flex flex-wrap gap-2">
                {brief.examples.map((ex, i) => (
                  <span key={i} className="text-xs bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1 rounded-full font-medium">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Excitement note */}
          {brief.excitement && (
            <p className="text-sm text-gray-500 italic border-l-2 border-sky-200 pl-3">
              "{brief.excitement}"
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <motion.button
            onClick={() => onSend(brief)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl text-sm hover:bg-gray-700 transition-colors"
          >
            Send this brief to Oliver →
          </motion.button>
          <p className="text-center text-xs text-gray-400 mt-3">He'll respond within 24 hours</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StartPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState(null);
  const [sent, setSent] = useState(false);
  const [started, setStarted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, brief]);

  async function sendMessage(text) {
    if (!text.trim() || loading || sent) return;

    const isFirst = messages.length === 0;
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          newConversation: isFirst,
        }),
      });

      if (res.status === 429) {
        setRateLimited(true);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.type === "brief") {
        setBrief(data.brief);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }

      setMessageCount((c) => c + 1);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong — please try again." }]);
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleSendBrief(brief) {
    const subject = encodeURIComponent(`Project Brief: ${brief.title}`);
    const body = encodeURIComponent(
      `Hi Oliver,\n\nHere's a brief from our conversation on your website:\n\n` +
      `Project: ${brief.title}\n\n` +
      `Summary: ${brief.summary}\n\n` +
      `Scope:\n${brief.scope.map((s) => `• ${s}`).join("\n")}\n\n` +
      `Timeline: ${brief.timeline}\n\n` +
      `Looking forward to chatting!`
    );
    window.open(`mailto:oliverjbunce@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const MAX_MSGS = 8;
  const atLimit = messageCount >= MAX_MSGS;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <a href="/" className="text-sm font-bold text-gray-900 hover:text-sky-500 transition-colors">← Oliver Bunce</a>
        <span className="text-xs text-gray-400">AI Discovery · Powered by GPT-4</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 pb-6">

        {/* Intro */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg shadow-sky-200"
              >
                ✦
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Let's build something.</h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
                Describe your business or project and I'll show you what's possible — specific ideas, real examples, no fluff.
              </p>
              <div className="w-full max-w-lg">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    onFocus={() => setStarted(true)}
                    placeholder={OPENING}
                    rows={3}
                    className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={() => { setStarted(true); sendMessage(input); }}
                    disabled={!input.trim()}
                    className="absolute right-3 bottom-3 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-xl disabled:opacity-30 hover:bg-sky-600 transition-colors"
                  >
                    Start →
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3">Press Enter to send · Shift+Enter for new line</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation */}
        {started && (
          <div className="flex-1 flex flex-col pt-8">
            {/* Oliver intro line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 mb-6"
            >
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">✦</div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg">
                <p className="text-xs text-sky-500 font-bold uppercase tracking-wide mb-1">Oliver's AI</p>
                <p className="text-sm text-gray-700 leading-relaxed">{OPENING}</p>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="space-y-4 flex-1">
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${m.role === "user" ? "justify-end" : "items-start gap-3"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">✦</div>
                    )}
                    <div
                      className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gray-900 text-white rounded-tr-sm"
                          : "bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-sm"
                      }`}
                    >
                      {m.role === "assistant" && (
                        <p className="text-xs text-sky-500 font-bold uppercase tracking-wide mb-1">Oliver's AI</p>
                      )}
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✦</div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {brief && <BriefCard brief={brief} onSend={handleSendBrief} />}

              {sent && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="font-semibold text-gray-800">Brief sent to Oliver</p>
                  <p className="text-sm text-gray-400 mt-1">He'll be in touch within 24 hours.</p>
                  <a href="/" className="inline-block mt-4 text-sm text-sky-500 hover:underline">← Back to portfolio</a>
                </motion.div>
              )}

              {rateLimited && (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">You've reached the limit for this hour. Come back later or email <a href="mailto:oliverjbunce@gmail.com" className="text-sky-500 underline">oliverjbunce@gmail.com</a> directly.</p>
                </div>
              )}
            </div>

            {/* Input */}
            {!brief && !sent && !rateLimited && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 sticky bottom-0 bg-white pt-3 border-t border-gray-100">
                {atLimit ? (
                  <p className="text-center text-sm text-gray-400 py-3">
                    Ready to move forward? <a href="mailto:oliverjbunce@gmail.com" className="text-sky-500 hover:underline">Email Oliver directly →</a>
                  </p>
                ) : (
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Reply..."
                      rows={2}
                      className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 pr-24 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="absolute right-3 bottom-3 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-xl disabled:opacity-30 hover:bg-sky-600 transition-colors"
                    >
                      Send →
                    </button>
                  </div>
                )}
                {!atLimit && <p className="text-xs text-gray-300 mt-2 text-center">{MAX_MSGS - messageCount} exchanges remaining</p>}
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}
