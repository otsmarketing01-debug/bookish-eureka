"use client";
import { useState, useMemo } from "react";
import { Calculator, MessageCircle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";

type RoomTier = "small" | "medium" | "large" | "commercial";
type CurtainHeight = "standard" | "doubleVolume";
type FabricType = "standard" | "delicate";

const tiers: { id: RoomTier; label: string; rooms: string; baseMin: number; baseMax: number }[] = [
  { id: "small", label: "Small", rooms: "1–2 Rooms", baseMin: 800, baseMax: 1500 },
  { id: "medium", label: "Medium", rooms: "3–4 Rooms", baseMin: 1500, baseMax: 3000 },
  { id: "large", label: "Large", rooms: "5+ Rooms", baseMin: 3000, baseMax: 5500 },
  { id: "commercial", label: "Commercial", rooms: "Hotel / Office", baseMin: 4500, baseMax: 9000 },
];

const heights: { id: CurtainHeight; label: string; spec: string; multiplier: number }[] = [
  { id: "standard", label: "Standard", spec: "Up to 3m", multiplier: 1.0 },
  { id: "doubleVolume", label: "Double Volume", spec: "Over 3m", multiplier: 1.35 },
];

const fabrics: { id: FabricType; label: string; spec: string; multiplier: number }[] = [
  { id: "standard", label: "Standard", spec: "Cotton, Poly, Linen", multiplier: 1.0 },
  { id: "delicate", label: "Delicate", spec: "Silk, Velvet, Sheer", multiplier: 1.2 },
];

const addons = [
  { id: "masterGuarding", label: "Master Guarding (Stain Protection)", range: "+R450 – R1,200", minAdd: 450, maxAdd: 1200 },
  { id: "fireProofing", label: "SANS Fire Proofing Certification", range: "+R1,200 – R2,500", minAdd: 1200, maxAdd: 2500 },
];

export function QuoteCalculator({ compact = false }: { compact?: boolean }) {
  const [tier, setTier] = useState<RoomTier>("small");
  const [height, setHeight] = useState<CurtainHeight>("standard");
  const [fabric, setFabric] = useState<FabricType>("standard");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const estimate = useMemo(() => {
    const tierData = tiers.find((t) => t.id === tier)!;
    const heightData = heights.find((h) => h.id === height)!;
    const fabricData = fabrics.find((f) => f.id === fabric)!;

    let min = tierData.baseMin * heightData.multiplier * fabricData.multiplier;
    let max = tierData.baseMax * heightData.multiplier * fabricData.multiplier;

    for (const addon of addons) {
      if (selectedAddons.has(addon.id)) {
        min += addon.minAdd;
        max += addon.maxAdd;
      }
    }

    return { min: Math.round(min), max: Math.round(max) };
  }, [tier, height, fabric, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleWhatsApp = () => {
    const tierLabel = tiers.find((t) => t.id === tier)?.label;
    const heightLabel = heights.find((h) => h.id === height)?.label;
    const fabricLabel = fabrics.find((f) => f.id === fabric)?.label;
    const addonList = addons.filter((a) => selectedAddons.has(a.id)).map((a) => a.label).join(", ") || "None";
    const text = encodeURIComponent(
      `Hi ${siteConfig.shortName}, I generated a quote on your website:\n\n• Property size: ${tierLabel}\n• Window height: ${heightLabel}\n• Fabric type: ${fabricLabel}\n• Add-ons: ${addonList}\n• Estimated range: R${estimate.min.toLocaleString()} – R${estimate.max.toLocaleString()}\n\nI'd like to book a free assessment!`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <Card className={compact ? "" : "shadow-xl"}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-lg sm:text-xl">Instant Quote Calculator</CardTitle>
            <CardDescription>Select your specifications for an instant estimated range.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Step 1: Room Tier */}
        <div>
          <p className="mb-2 text-sm font-medium">1. Property size</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`flex flex-col items-center gap-0.5 rounded-lg border p-2.5 text-center transition-all ${
                  tier === t.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-semibold">{t.label}</span>
                <span className="text-[11px] text-muted-foreground">{t.rooms}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Height */}
        <div>
          <p className="mb-2 text-sm font-medium">2. Window height</p>
          <div className="grid grid-cols-2 gap-2">
            {heights.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setHeight(h.id)}
                className={`flex flex-col items-center gap-0.5 rounded-lg border p-2.5 text-center transition-all ${
                  height === h.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-semibold">{h.label}</span>
                <span className="text-[11px] text-muted-foreground">{h.spec}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Fabric */}
        <div>
          <p className="mb-2 text-sm font-medium">3. Fabric type</p>
          <div className="grid grid-cols-2 gap-2">
            {fabrics.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFabric(f.id)}
                className={`flex flex-col items-center gap-0.5 rounded-lg border p-2.5 text-center transition-all ${
                  fabric === f.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-semibold">{f.label}</span>
                <span className="text-[11px] text-muted-foreground">{f.spec}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Add-ons */}
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-sm font-medium">4. Optional treatments</p>
          <div className="space-y-2">
            {addons.map((a) => (
              <label
                key={a.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-colors ${
                  selectedAddons.has(a.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAddons.has(a.id)}
                  onChange={() => toggleAddon(a.id)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">{a.label}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{a.range}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price display + CTA */}
        <div className="flex flex-col gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Estimated price range:</p>
            <p className="text-2xl font-extrabold text-primary sm:text-3xl">
              R{estimate.min.toLocaleString()} – R{estimate.max.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground">Includes free on-site assessment · No obligation</p>
          </div>
          <div className="flex flex-col gap-2 sm:w-auto">
            <Button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1DA851] sm:w-auto">
              <MessageCircle className="mr-2 h-4 w-4" /> Lock in via WhatsApp
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a href="/book">Book free assessment <ArrowRight className="ml-1 h-3.5 w-3.5" /></a>
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Estimates are indicative ranges. Your exact quote is confirmed after a free on-site assessment.
        </p>
      </CardContent>
    </Card>
  );
}
