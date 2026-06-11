import { useState } from "react";
import { Flag, Search, Download, ShieldCheck, HelpCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_LOGS = [
  { id: "log1", action: "User KYC Approved", actor: "James Okonkwo (Admin)", time: "10 mins ago", target: "Amira Hassan", severity: "info" },
  { id: "log2", action: "Suspended Fake Account", actor: "Security Daemon", time: "1 hour ago", target: "user_4821", severity: "warning" },
  { id: "log3", action: "Linked API Token Keys", actor: "Tanaka Institute", time: "3 hours ago", target: "Matching Service API", severity: "info" },
  { id: "log4", action: "Deleted Reported Post", actor: "Sarah Mitchell (Moderator)", time: "6 hours ago", target: "Discussion thread ID #9842", severity: "warning" },
];

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [search, setSearch] = useState("");

  const handleExport = () => {
    toast.success("Ecosystem audit logs downloaded successfully!");
  };

  const filtered = logs.filter(l => !search || l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Flag size={22} className="text-primary" /> Ecosystem Audit Logs
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Platform actions log auditing. Track administrative activities and system updates.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={handleExport} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Download size={13} /> Export Logs
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted text-muted-foreground uppercase border-b border-border font-semibold">
                <tr>
                  <th className="px-4 py-3">Logged Activity</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Target Node</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Logged Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{l.action}</td>
                    <td className="px-4 py-3">{l.actor}</td>
                    <td className="px-4 py-3 text-primary">{l.target}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full capitalize border",
                        l.severity === "warning" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}>{l.severity}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No operations match search filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
