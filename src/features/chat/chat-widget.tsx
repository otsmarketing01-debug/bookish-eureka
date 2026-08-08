"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { siteConfig } from "@/lib/config";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("jhb_chat_visitor_name") ?? "" : ""
  );
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { connected, room, messages, adminTyping, startChat, sendMessage, sendTyping } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, adminTyping, open]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    startChat(name.trim(), email.trim());
    setStarted(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
    sendTyping(false);
  };

  const handleInputChange = (v: string) => {
    setInput(v);
    sendTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => sendTyping(false), 1500));
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 sm:bottom-6 sm:right-6"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-3 z-50 flex h-[32rem] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{siteConfig.name}</p>
                  <p className="flex items-center gap-1 text-[11px] text-primary-foreground/80">
                    <Circle className={`h-2 w-2 fill-current ${connected ? "text-success" : "text-warning"}`} />
                    {connected ? "Online now" : "Connecting…"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-primary-foreground/15" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            {!started ? (
              <div className="flex flex-1 flex-col justify-center gap-4 p-5">
                <div className="text-center">
                  <h3 className="text-base font-semibold">Chat with our team</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a free quote in minutes. We typically reply instantly during business hours.
                  </p>
                </div>
                <form onSubmit={handleStart} className="space-y-3">
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={!name.trim()}>
                    Start Chat
                  </Button>
                </form>
                <p className="text-center text-[11px] text-muted-foreground">
                  Or call us: <a href={`tel:${siteConfig.phone}`} className="font-medium text-primary">{siteConfig.phoneDisplay}</a>
                </p>
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
                  <div className="mx-auto max-w-[85%] rounded-lg bg-success/15 px-3 py-2 text-center text-xs text-success">
                    Thanks {name.split(" ")[0]}! A team member will be with you shortly. Meanwhile, ask us anything about curtain cleaning.
                  </div>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                          m.sender === "visitor"
                            ? "rounded-br-sm bg-primary text-primary-foreground"
                            : "rounded-bl-sm bg-card border border-border"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{m.content}</p>
                        <p className={`mt-0.5 text-[10px] ${m.sender === "visitor" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {adminTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-card border border-border px-3 py-3">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
                  <Input
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
