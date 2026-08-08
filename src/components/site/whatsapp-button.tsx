"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi ${siteConfig.shortName}, I'd like a free curtain cleaning quote.`
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.7, type: "spring" }}
      className="fixed bottom-5 right-20 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition hover:bg-[#1DA851] sm:bottom-6 sm:right-20"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
      </span>
    </motion.a>
  );
}
