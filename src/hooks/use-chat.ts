"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export type ChatMessage = {
  roomId: string;
  sender: "visitor" | "admin" | "system";
  content: string;
  createdAt: string;
};

export type ChatRoom = {
  id: string;
  visitorId: string;
  visitorName: string;
  status: string;
};

const VISITOR_KEY = "jhb_chat_visitor_id";
const NAME_KEY = "jhb_chat_visitor_name";

function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `v_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function useChat() {
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [adminTyping, setAdminTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const joinedRef = useRef(false);

  // Connect
  useEffect(() => {
    const socket = io("/?XTransformPort=3001", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("visitor:room", ({ room }: { room: ChatRoom }) => {
      setRoom(room);
      // load history
      fetch(`/api/chat/messages?roomId=${room.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.messages) {
            setMessages(
              data.messages.map((m: any) => ({
                roomId: m.roomId,
                sender: m.sender,
                content: m.content,
                createdAt: m.createdAt,
              }))
            );
          }
        })
        .catch(() => {});
    });

    socket.on("message:new", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      setAdminTyping(false);
    });

    socket.on("typing:start", () => setAdminTyping(true));
    socket.on("typing:stop", () => setAdminTyping(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  const startChat = useCallback((name: string, email?: string) => {
    const socket = socketRef.current;
    if (!socket || joinedRef.current) return;
    const visitorId = getOrCreateVisitorId();
    localStorage.setItem(NAME_KEY, name);
    joinedRef.current = true;
    socket.emit("visitor:join", {
      visitorId,
      visitorName: name,
      visitorEmail: email || "",
      subject: "Website enquiry",
    });
  }, []);

  const sendMessage = useCallback((content: string) => {
    const socket = socketRef.current;
    if (!socket || !room || !content.trim()) return;
    const msg: ChatMessage = {
      roomId: room.id,
      sender: "visitor",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    socket.emit("message:send", {
      roomId: room.id,
      sender: "visitor",
      content: content.trim(),
    });
  }, [room]);

  const sendTyping = useCallback((isTyping: boolean) => {
    const socket = socketRef.current;
    if (!socket || !room) return;
    socket.emit(isTyping ? "typing:start" : "typing:stop", room.id);
  }, [room]);

  return { connected, room, messages, adminTyping, startChat, sendMessage, sendTyping };
}
