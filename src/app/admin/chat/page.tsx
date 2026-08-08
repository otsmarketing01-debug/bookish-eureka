"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Circle, UserCheck, XCircle, Loader2, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminChat } from "@/hooks/use-admin-chat";
import { formatDate } from "@/lib/format";

export default function AdminChatPage() {
  const { connected, rooms, activeRoom, messages, visitorTyping, openRoom, claimRoom, closeRoom, sendMessage } = useAdminChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, activeRoom]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const waiting = rooms.filter((r) => r.status === "waiting");
  const active = rooms.filter((r) => r.status === "active");

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Live Chat</h1>
            <p className="text-sm text-muted-foreground">{waiting.length} waiting · {active.length} active</p>
          </div>
          <Badge variant={connected ? "default" : "secondary"} className="gap-1.5">
            <Circle className={`h-2 w-2 fill-current ${connected ? "text-success" : "text-warning"}`} />
            {connected ? "Connected" : "Connecting…"}
          </Badge>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-3">
        {/* Room list */}
        <ScrollArea className="h-full border-r lg:col-span-1">
          {rooms.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No chats yet.</p>
              <p className="px-6 text-xs text-muted-foreground/70">Visitor chats will appear here in real time.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => openRoom(room)}
                  className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-accent ${activeRoom?.id === room.id ? "bg-accent" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{room.visitorName}</span>
                    {room.status === "waiting" && <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Waiting</Badge>}
                    {room.status === "active" && <Badge className="bg-success/15 text-success hover:bg-success/15">Active</Badge>}
                    {room.status === "closed" && <Badge variant="secondary">Closed</Badge>}
                  </div>
                  {room.subject && <p className="truncate text-xs text-muted-foreground">{room.subject}</p>}
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                    <Clock className="h-3 w-3" /> {formatDate(room.updatedAt)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Conversation */}
        <div className="hidden flex-col lg:col-span-2 lg:flex">
          {!activeRoom ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              {/* Conversation header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {activeRoom.visitorName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{activeRoom.visitorName}</p>
                    {activeRoom.visitorEmail && <p className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{activeRoom.visitorEmail}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {activeRoom.status === "waiting" && (
                    <Button size="sm" onClick={() => claimRoom(activeRoom.id)}>
                      <UserCheck className="mr-1.5 h-4 w-4" /> Claim
                    </Button>
                  )}
                  {activeRoom.status !== "closed" && (
                    <Button size="sm" variant="outline" onClick={() => closeRoom(activeRoom.id)}>
                      <XCircle className="mr-1.5 h-4 w-4" /> Close
                    </Button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-5">
                {messages.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No messages yet. Say hello!</p>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === "admin" ? "justify-end" : m.sender === "system" ? "justify-center" : "justify-start"}`}>
                      {m.sender === "system" ? (
                        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{m.content}</span>
                      ) : (
                        <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${m.sender === "admin" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-card border border-border"}`}>
                          <p className="whitespace-pre-wrap break-words">{m.content}</p>
                          <p className={`mt-0.5 text-[10px] ${m.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {visitorTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-card border border-border px-3 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
                <Input
                  placeholder={activeRoom.status === "closed" ? "This conversation is closed" : "Type your reply…"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={activeRoom.status === "closed"}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || activeRoom.status === "closed"}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
