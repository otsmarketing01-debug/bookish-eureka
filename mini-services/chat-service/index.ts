// JHB Curtain Cleaning — live chat service (Socket.io)
// Port: 3001. Frontend connects via io("/?XTransformPort=3001").
// Real-time relay; persistence delegated to the Next.js API.
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3001;
const NEXT_API = "http://localhost:3000";

type IncomingMessage = {
  roomId: string;
  sender: "visitor" | "admin";
  content: string;
};

type RoomInit = {
  visitorId: string;
  visitorName: string;
  visitorEmail?: string;
  subject?: string;
};

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "chat", port: PORT }));
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

const io = new Server(httpServer, {
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Track connected admins
const adminSockets = new Set<string>();

async function persist(roomId: string, sender: string, content: string) {
  try {
    await fetch(`${NEXT_API}/api/chat/messages`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ roomId, sender, content }),
    });
  } catch (e) {
    console.error("[chat] persist failed:", e);
  }
}

async function ensureRoom(init: RoomInit) {
  try {
    const res = await fetch(`${NEXT_API}/api/chat/messages`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(init),
    });
    const data = await res.json();
    return data?.room ?? null;
  } catch (e) {
    console.error("[chat] ensureRoom failed:", e);
    return null;
  }
}

io.on("connection", (socket) => {
  console.log(`[chat] connected: ${socket.id}`);

  // --- Visitor flow ---
  socket.on("visitor:join", async (init: RoomInit) => {
    if (!init?.visitorId || !init?.visitorName) return;
    const room = await ensureRoom(init);
    if (!room) {
      socket.emit("error", { message: "Could not start chat" });
      return;
    }
    socket.join(`room:${room.id}`);
    socket.data.roomId = room.id;
    socket.data.role = "visitor";
    socket.emit("visitor:room", { room });

    // Notify all admins of a (potentially) new waiting room
    io.to([...adminSockets]).emit("admin:room-update", { room });
  });

  // --- Admin flow ---
  socket.on("admin:join", () => {
    adminSockets.add(socket.id);
    socket.data.role = "admin";
    console.log(`[chat] admin joined: ${socket.id}`);
  });

  socket.on("admin:open-room", (roomId: string) => {
    if (!roomId) return;
    socket.join(`room:${roomId}`);
  });

  // --- Messaging (shared) ---
  socket.on("message:send", async (msg: IncomingMessage) => {
    const { roomId, sender, content } = msg;
    if (!roomId || !content?.trim()) return;

    const message = {
      roomId,
      sender,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    // Broadcast to everyone in the room (visitor + any admins)
    io.to(`room:${roomId}`).emit("message:new", message);

    // Persist via Next.js API
    await persist(roomId, sender, message.content);
  });

  // --- Typing indicators ---
  socket.on("typing:start", (roomId: string) => {
    socket.to(`room:${roomId}`).emit("typing:start", { roomId });
  });
  socket.on("typing:stop", (roomId: string) => {
    socket.to(`room:${roomId}`).emit("typing:stop", { roomId });
  });

  socket.on("disconnect", () => {
    adminSockets.delete(socket.id);
    console.log(`[chat] disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[chat] Socket.io server listening on port ${PORT}`);
});
