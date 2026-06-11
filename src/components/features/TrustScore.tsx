import { useMemo } from "react";
import { cn, getTrustScoreColor, getTrustScoreLabel } from "@/lib/utils";

interface TrustScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showRing?: boolean;
  className?: string;
}

export default function TrustScore({
  score,
  size = "md",
  showLabel = true,
  showRing = true,
  className,
}: TrustScoreProps) {
  const dimensions = {
    sm: { svg: 56, r: 22, stroke: 4, text: "text-sm", label: "text-[10px]" },
    md: { svg: 80, r: 32, stroke: 5, text: "text-xl", label: "text-xs" },
    lg: { svg: 110, r: 44, stroke: 6, text: "text-3xl", label: "text-sm" },
  };

  const d = dimensions[size];
  const circumference = 2 * Math.PI * d.r;
  const offset = circumference - (score / 100) * circumference;

  const strokeColor = score >= 85
    ? "#10B981"
    : score >= 65
    ? "#2563EB"
    : score >= 45
    ? "#F59E0B"
    : "#EF4444";

  if (!showRing) {
    return (
      <span className={cn("font-bold tabular-nums", getTrustScoreColor(score), className)}>
        {score}
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg width={d.svg} height={d.svg} viewBox={`0 0 ${d.svg} ${d.svg}`}>
          {/* Track */}
          <circle
            cx={d.svg / 2}
            cy={d.svg / 2}
            r={d.r}
            fill="none"
            stroke="currentColor"
            strokeWidth={d.stroke}
            className="text-border"
          />
          {/* Progress */}
          <circle
            cx={d.svg / 2}
            cy={d.svg / 2}
            r={d.r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={d.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold tabular-nums leading-none", d.text)} style={{ color: strokeColor }}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn("font-medium text-muted-foreground", d.label)}>
          {getTrustScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
