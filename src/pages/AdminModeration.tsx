import { useState } from "react";
import { Eye, ShieldAlert, Trash, Search, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_POSTS = [
  { id: "p1", author: "FakeProfile101", title: "Free crypto investment links", content: "Join our verified WhatsApp channel for guaranteed 200% returns in 3 days. verified by TruNet partners.", flags: 8, reason: "Spam / Scam Links" },
  { id: "p2", author: "AnonymityTech", title: "Competitor review exposes due diligence fraud", content: "Apex Ventures has been faking their seed funding records for the past 6 months.", flags: 3, reason: "Defamation / Harassment" },
];

export default function AdminModeration() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, action: "keep" | "delete") => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success(action === "keep" ? "Content marked safe." : "Flagged content removed.");
  };

  const filtered = posts.filter(p => !search || p.author.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Eye size={22} className="text-primary" /> Content Moderation
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Moderate reported discussion threads, articles, and comment sections.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..." className="input-field pl-11 py-1.5 text-xs" />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.id} className="p-4 bg-card border border-border rounded-2xl space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">@{p.author}</span>
                  <span>·</span>
                  <span className="text-red-500 font-semibold flex items-center gap-0.5"><ShieldAlert size={11} /> {p.flags} reports ({p.reason})</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-xl border border-border">{p.content}</p>
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button onClick={() => handleAction(p.id, "keep")} className="btn-secondary py-1 px-3 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle size={12} className="text-emerald-500" /> Ignore Flags
                </button>
                <button onClick={() => handleAction(p.id, "delete")} className="btn-primary py-1 px-3 text-xs font-semibold bg-red-600 hover:bg-red-600/90 text-white flex items-center gap-1">
                  <Trash size={12} /> Remove Content
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Ecosystem is clean! No moderation reports pending.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
