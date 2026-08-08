"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export type AdminMessage = {
  roomId: string;
  sender: "visitor" | "admin" | "system";
  content: string;
  createdAt: string;
};

export type AdminRoom = {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorEmail: string | null;
  status: string;
  subject: string | null;
  assignedTo: string | null;
  updatedAt: string;
  createdAt: string;
  messages?: AdminMessage[];
};

export function useAdminChat() {
  const [connected, setConnected] = useState(false);
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<AdminRoom | null>(null);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [visitorTyping, setVisitorTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const activeRoomIdRef = useRef<string | null>(null);

  // Connect
  useEffect(() => {
    const socket = io("/?XTransformPort=3001", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("admin:join");
      // load initial rooms
      fetch("/api/chat-rooms")
        .then((r) => r.json())
        .then((data) => setRooms(data.rooms ?? []))
        .catch(() => {});
    });
    socket.on("disconnect", () => setConnected(false));

    socket.on("admin:room-update", ({ room }: { room: AdminRoom }) => {
      setRooms((prev) => {
        const idx = prev.findIndex((r) => r.id === room.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ...room };
          return copy;
        }
        return [room, ...prev];
      });
    });

    socket.on("message:new", (msg: AdminMessage) => {
      setMessages((prev) => {
        if (activeRoomIdRef.current && msg.roomId === activeRoomIdRef.current) {
          return [...prev, msg];
        }
        return prev;
      });
      // bump room in list
      setRooms((prev) =>
        prev.map((r) => (r.id === msg.roomId ? { ...r, updatedAt: new Date().toISOString() } : r))
      );
    });

    socket.on("typing:start", () => setVisitorTyping(true));
    socket.on("typing:stop", () => setVisitorTyping(false));

    return () => { socket.disconnect(); };
  }, []);

  const openRoom = useCallback(async (room: AdminRoom) => {
    const socket = socketRef.current;
    if (!socket) return;
    activeRoomIdRef.current = room.id;
    setActiveRoom(room);
    socket.emit("admin:open-room", room.id);
    setVisitorTyping(false);
    try {
      const res = await fetch(`/api/chat/messages?roomId=${room.id}`);
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      setMessages(room.messages ?? []);
    }
  }, []);

  const claimRoom = useCallback(async (roomId: string) => {
    const res = await fetch(`/api/chat-rooms/${roomId}`, { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setRooms((prev) => prev.map((r) => (r.id === roomId ? data.room : r)));
    setActiveRoom((prev) => (prev?.id === roomId ? data.room : prev));
  }, []);

  const closeRoom = useCallback(async (roomId: string) => {
    const res = await fetch(`/api/chat-rooms/${roomId}`, { method: "PATCH" });
    if (!res.ok) return;
    const data = await res.json();
    setRooms((prev) => prev.map((r) => (r.id === roomId ? data.room : r)));
    setActiveRoom((prev) => (prev?.id === roomId ? data.room : prev));
  }, []);

  const sendMessage = useCallback((content: string) => {
    const socket = socketRef.current;
    if (!socket || !activeRoom || !content.trim()) return;
    const msg: AdminMessage = {
      roomId: activeRoom.id,
      sender: "admin",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    socket.emit("message:send", {
      roomId: activeRoom.id,
      sender: "admin",
      content: content.trim(),
    });
  }, [activeRoom]);

  return { connected, rooms, activeRoom, messages, visitorTyping, openRoom, claimRoom, closeRoom, sendMessage };
}
