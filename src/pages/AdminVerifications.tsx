import { useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, Search, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_QUEUE = [
  { id: "v1", name: "Amira Hassan", type: "KYC Check", docs: "Passport Scan", risk: "low", time: "2 hours ago" },
  { id: "v2", name: "BuildFast LLC", type: "Business Reg", docs: "Inc Certificate + Tax ID", risk: "medium", time: "5 hours ago" },
  { id: "v3", name: "Dr. Felix Ngozi", type: "Expert Credentials", docs: "Ph.D. Diploma + License", risk: "low", time: "1 day ago" },
  { id: "v4", name: "TechBridge Co", type: "Business Reg", docs: "CAC Documents + Bank Stmt", risk: "high", time: "2 days ago" },
];

export default function AdminVerifications() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, name: string, approve: boolean) => {
    setQueue(prev => prev.filter(v => v.id !== id));
    toast.success(`${name}'s application has been ${approve ? "approved ✓" : "rejected ✗"}`);
  };

  const filtered = queue.filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <ShieldCheck size={22} className="text-primary" /> Verification Queue
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Review identity, credentials, and business registrations.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search queue..." className="input-field pl-11 py-1.5 text-xs" />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(v => (
            <div key={v.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-sm">{v.name}</h3>
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase",
                    v.risk === "high" ? "bg-red-500/10 text-red-500 border-red-500/20" : v.risk === "medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  )}>{v.risk} Risk</span>
                </div>
                <p className="text-xs text-muted-foreground">Type: {v.type} · Documents: {v.docs}</p>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Clock size={9} /> {v.time}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAction(v.id, v.name, true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1 bg-emerald-600 hover:bg-emerald-600/90 text-white">
                  <CheckCircle2 size={12} /> Approve
                </button>
                <button onClick={() => handleAction(v.id, v.name, false)} className="btn-secondary py-1.5 px-3 text-xs font-semibold text-red-500 hover:bg-red-500/10 border-red-500/20 flex items-center gap-1">
                  <XCircle size={12} /> Reject
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Queue is completely clear!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
