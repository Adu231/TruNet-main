import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastBannerProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export default function ToastBanner({ type, message, onClose }: ToastBannerProps) {
  const styles = {
    success: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  };

  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium", styles[type])}>
      <CheckCircle size={16} className="flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}
