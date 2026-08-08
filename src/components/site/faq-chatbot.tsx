"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Markdown } from "@/components/site/markdown";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Will my curtains shrink?",
  "How much does curtain cleaning cost?",
  "Do you clean velvet curtains?",
  "How often should I clean my curtains?",
];

export function FaqChatbot() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;
    setLoading(true);
    const userMsg: Msg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/faq-ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Couldn't get an answer");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: json.answer }]);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold">Ask our AI assistant</h3>
          <p className="text-xs text-muted-foreground">Instant answers about curtain cleaning, pricing, and more</p>
        </div>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto scrollbar-thin pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted border border-border"
                }`}
              >
                {m.role === "assistant" ? <Markdown content={m.content} /> : <p className="whitespace-pre-wrap">{m.content}</p>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted border border-border px-3.5 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
        <Input
          placeholder="Ask anything about curtain cleaning…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || loading} className="shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
      <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
        AI-powered answers. For bookings, use our <a href="/book" className="text-primary underline-offset-2 hover:underline">booking page</a> or <a href="/contact" className="text-primary underline-offset-2 hover:underline">contact form</a>.
      </p>
    </div>
  );
}
