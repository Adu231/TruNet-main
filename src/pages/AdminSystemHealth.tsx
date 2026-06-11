import { useState } from "react";
import { Database, RefreshCw, Cpu, Server, HardDrive, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_SERVICES = [
  { name: "Auth Gateway Node", status: "operational", latency: "48ms", load: "12%" },
  { name: "KYC Verification Engine", status: "operational", latency: "1.2s", load: "24%" },
  { name: "AI Matchmaker Engine", status: "operational", latency: "320ms", load: "41%" },
  { name: "Secure Messaging Node", status: "operational", latency: "65ms", load: "8%" },
  { name: "Reputation Sync Indexer", status: "operational", latency: "140ms", load: "19%" },
  { name: "Directory Search Cache", status: "degraded", latency: "890ms", load: "78%" },
];

export default function AdminSystemHealth() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setServices(prev => prev.map(s => s.name.includes("Search") ? { ...s, status: "operational", latency: "110ms", load: "34%" } : s));
      toast.success("Ecosystem metrics successfully refreshed!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Database size={22} className="text-primary" /> System Health Monitor
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Real-time ecosystem latencies, memory footprint, and microservices status.</p>
          </div>
          <button onClick={handleRefresh} disabled={isRefreshing} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5">
            <RefreshCw size={13} className={cn(isRefreshing && "animate-spin")} /> {isRefreshing ? "Checking..." : "Refresh Status"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Cores", value: "32 / 32 Online", desc: "No core throttle", icon: Cpu },
            { label: "Memory Load", value: "42.8 GB / 128 GB", desc: "33.4% usage", icon: Server },
            { label: "Database Storage", value: "1.42 TB / 10 TB", desc: "Solid State cluster", icon: HardDrive },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <stat.icon size={16} className="text-primary" />
              </div>
              <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-emerald-500 font-semibold mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" /> Active Microservices Nodes
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map(svc => (
              <div key={svc.name} className="p-3.5 bg-muted/30 border border-border rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0 animate-pulse",
                    svc.status === "operational" ? "bg-emerald-500" : "bg-yellow-500"
                  )} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{svc.name}</p>
                    <p className="text-[9px] text-muted-foreground capitalize">Status: {svc.status} · Load: {svc.load}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground flex-shrink-0">{svc.latency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
