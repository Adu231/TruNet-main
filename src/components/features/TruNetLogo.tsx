import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface TruNetLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function TruNetLogo({ variant = "default", size = "md" }: TruNetLogoProps) {
  const sizes = {
    sm: { icon: 16, text: "text-base" },
    md: { icon: 20, text: "text-lg" },
    lg: { icon: 28, text: "text-2xl" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-lg flex items-center justify-center",
          size === "sm" ? "w-7 h-7" : size === "md" ? "w-9 h-9" : "w-12 h-12",
          "bg-gradient-to-br from-blue-600 to-blue-700 shadow-brand-sm"
        )}
      >
        <Shield
          size={s.icon}
          className="text-white"
          strokeWidth={2.5}
          fill="rgba(255,255,255,0.15)"
        />
      </div>
      <span
        className={cn(
          "font-display font-bold tracking-tight",
          s.text,
          variant === "light"
            ? "text-white"
            : variant === "dark"
            ? "text-gray-900"
            : "text-foreground"
        )}
      >
        Tru<span className="text-primary">Net</span>
      </span>
    </div>
  );
}
