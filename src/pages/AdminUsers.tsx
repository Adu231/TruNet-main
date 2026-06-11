import { useState } from "react";
import { Users, Search, Ban, CheckCircle, ShieldAlert, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_USERS = [
  { id: "u1", name: "Sarah Mitchell", email: "sarah@apex.com", role: "professional", trustScore: 94, isVerified: true, status: "active" },
  { id: "u2", name: "James Okonkwo", email: "james@techscale.io", role: "business", trustScore: 91, isVerified: true, status: "active" },
  { id: "u3", name: "Priya Sharma", email: "priya@hireforce.pro", role: "recruiter", trustScore: 88, isVerified: true, status: "active" },
  { id: "u4", name: "Marcus Chen", email: "marcus@chen.com", role: "freelancer", trustScore: 96, isVerified: true, status: "active" },
  { id: "u5", name: "David Park", email: "david@buildfast.co", role: "freelancer", trustScore: 89, isVerified: false, status: "active" },
  { id: "u6", name: "Kola Adesanya", email: "kola@remitfast.com", role: "investor", trustScore: 95, isVerified: true, status: "suspended" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");

  const handleToggleStatus = (id: string, name: string, isSuspended: boolean) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: isSuspended ? "active" : "suspended" } : u));
    toast.success(`${name} has been ${isSuspended ? "activated" : "suspended"}`);
  };

  const handleVerify = (id: string, name: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isVerified: true, trustScore: 100 } : u));
    toast.success(`${name} has been authenticated with verified trust badge.`);
  };

  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users size={22} className="text-primary" /> User Management
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Verify credentials, view reputation scores, and manage access parameters.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name, role..." className="input-field pl-11 py-1.5 text-xs" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted text-muted-foreground uppercase border-b border-border font-semibold">
                <tr>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Trust Score</th>
                  <th className="px-4 py-3">Verification</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-bold text-foreground">{u.name}</p>
                        <p className="text-[10px] text-muted-foreground">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{u.role}</td>
                    <td className="px-4 py-3 font-bold text-primary">{u.trustScore}</td>
                    <td className="px-4 py-3">
                      {u.isVerified ? (
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <CheckCircle size={12} /> Verified
                        </span>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <ShieldAlert size={12} /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize",
                        u.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      )}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        {!u.isVerified && (
                          <button onClick={() => handleVerify(u.id, u.name)} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-600/90 text-white rounded font-bold text-[10px] flex items-center gap-0.5">
                            <Award size={10} /> Authenticate
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleStatus(u.id, u.name, u.status === "suspended")}
                          className={cn(
                            "px-2 py-1 rounded font-bold text-[10px] flex items-center gap-0.5 border",
                            u.status === "suspended" ? "bg-primary text-white border-primary" : "text-red-500 border-red-500/20 hover:bg-red-500/10"
                          )}
                        >
                          <Ban size={10} /> {u.status === "suspended" ? "Unsuspend" : "Suspend"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Users size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No users found matching query.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
