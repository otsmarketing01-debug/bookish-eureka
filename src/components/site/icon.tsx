import {
  Wind, BedDouble, Sofa, ShieldCheck, Flame, Square,
  ClipboardCheck, SprayCan, Sparkles,
  Hotel, Building2, HeartPulse, GraduationCap, Drama, Home,
  MapPin, Clock, Phone, Mail, Star, CheckCircle2, ArrowRight,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Wind, BedDouble, Sofa, ShieldCheck, Flame, Square,
  ClipboardCheck, SprayCan, Sparkles,
  Hotel, Building2, HeartPulse, GraduationCap, Drama, Home,
  MapPin, Clock, Phone, Mail, Star, CheckCircle2, ArrowRight,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
