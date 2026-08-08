"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function WhatsAppCTA({
  message,
  label = "WhatsApp Us",
  variant = "default",
  size = "lg",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const text = encodeURIComponent(message || `Hi ${siteConfig.shortName}, I'd like a free curtain cleaning quote.`);
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${text}`;

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={variant === "default" ? `bg-[#25D366] hover:bg-[#1DA851] ${className}` : className}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-4 w-4" /> {label}
      </a>
    </Button>
  );
}
