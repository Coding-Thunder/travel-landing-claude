import {
  Globe,
  Sparkles,
  Headset,
  ShieldCheck,
  Phone,
  Lock,
  CreditCard,
  Users,
  FileCheck2,
  BedDouble,
  Briefcase,
  MapPin,
  Clock,
  Mail,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  globe: Globe,
  sparkles: Sparkles,
  headset: Headset,
  "shield-check": ShieldCheck,
  phone: Phone,
  lock: Lock,
  "credit-card": CreditCard,
  users: Users,
  "file-check": FileCheck2,
  bed: BedDouble,
  briefcase: Briefcase,
  "map-pin": MapPin,
  clock: Clock,
  mail: Mail,
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
