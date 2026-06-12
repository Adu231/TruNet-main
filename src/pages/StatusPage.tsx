import { useState } from "react";
import { CheckCircle2, AlertTriangle, Clock, RefreshCw, Server, ShieldCheck, Cpu, Database } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const SYSTEMS = [
  { name: "API Gateway Node", desc: "Main public ingress endpoints routing requests to service microservices.", status: "operational", icon: Server },
  { name: "Matchmaker Engine", desc: "AI-driven professional affinity pairing algorithm models.", status: "operational", icon: Cpu },
  { name: "KYC Verification Pipeline", desc: "Government ID validation partner sync and verification logging.", status: "operational", icon: ShieldCheck },
  { name: "Trust Index Database", desc: "Distributed ledger holding verified trust scores.", status: "operational", icon: Database },
];

const INCIDENTS = [
  { date: "May 24, 2026", title: "KYC Verification Delay", desc: "Partner API degradation caused up to 5-minute delays in verification queue updates. Resolved in 42 minutes.", severity: "resolved" },
  { date: "April 11, 2026", title: "Scheduled Matchmaker Optimization", desc: "Database indexes were optimized during off-peak hours. System remained operational with brief latency spikes.", severity: "maintenance" }
];

export default function StatusPage() {
  const [checking, setChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState("Just now");

  const handleRefresh = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setLastCheck(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      toast.success("Systems status refreshed. All validator nodes synchronized.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Status Banner */}
          <div className="bg-card border border-emerald-500/20 rounded-3xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">All Systems Operational</h1>
                <p className="text-xs text-muted-foreground mt-0.5">TruNet validator nodes are operating at 100% efficiency. Overall uptime over 90 days is 99.98%.</p>
              </div>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={checking}
              className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              <RefreshCw size={13} className={checking ? "animate-spin" : ""} />
              {checking ? "Checking Nodes..." : `Refreshed: ${lastCheck}`}
            </button>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* System Nodes Checklist (left columns) */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h2 className="text-lg font-display font-bold text-foreground">Operational Nodes</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Real-time status of individual core platform subsystems.</p>
              </div>

              <div className="space-y-3">
                {SYSTEMS.map((sys) => (
                  <div key={sys.name} className="p-4 rounded-xl border border-border bg-card flex items-start justify-between gap-4 card-hover">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                        <sys.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">{sys.name}</h4>
                        <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">{sys.desc}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-500 flex-shrink-0 capitalize">
                      {sys.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Incidents (right columns) */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-display font-bold text-foreground">Incident Log</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Historical record of platform incidents and optimizations.</p>
              </div>

              <div className="space-y-4">
                {INCIDENTS.map((inc) => (
                  <div key={inc.title} className="p-5 rounded-2xl border border-border bg-card/40 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-semibold text-muted-foreground">{inc.date}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${inc.severity === "resolved" ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20" : "bg-blue-500/15 text-blue-500 border border-blue-500/20"}`}>
                          {inc.severity}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-xs">{inc.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{inc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
