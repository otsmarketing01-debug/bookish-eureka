"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services, areas } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  area: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.error ?? "Something went wrong. Please try again.");
      return;
    }
    toast.success("Thank you! We'll be in touch within 1 business hour.");
    setDone(true);
    reset();
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="text-lg font-semibold">Request received!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. One of our team will contact you within 1 business hour during operating hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setDone(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="jane@example.co.za" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+27 82 555 0000" {...register("phone")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="area">Area</Label>
          <select
            id="area"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("area")}
          >
            <option value="">Select area…</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.region}>
                {a.region} ({a.suburb})
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {!compact && (
        <div className="space-y-1.5">
          <Label htmlFor="service">Service needed</Label>
          <select
            id="service"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("service")}
          >
            <option value="">Select service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure">Not sure yet</option>
          </select>
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="message">How can we help? *</Label>
        <Textarea
          id="message"
          rows={compact ? 3 : 4}
          placeholder="Tell us about your curtains, blinds, or cleaning needs…"
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Get my free quote
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        We respond within 1 business hour. No obligation, no hidden fees.
      </p>
    </form>
  );
}
