import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function getTrustScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 65) return "text-blue-600 dark:text-blue-400";
  if (score >= 45) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export function getTrustScoreLabel(score: number): string {
  if (score >= 85) return "Highly Trusted";
  if (score >= 65) return "Trusted";
  if (score >= 45) return "Building Trust";
  return "New Member";
}

export function getTrustScoreBg(score: number): string {
  if (score >= 85) return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
  if (score >= 65) return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300";
  if (score >= 45) return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300";
  return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
