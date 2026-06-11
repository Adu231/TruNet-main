import { useState } from "react";
import { BookOpen, Plus, Eye, ThumbsUp, MessageSquare, Search, Trash2, Globe } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_ARTICLES = [
  { id: "a1", title: "Verifiable Identity Protocols in Web3 Networks", views: 2450, likes: 180, comments: 24, date: "June 5, 2026", status: "Published" },
  { id: "a2", title: "Sourcing Verified Tech Talent Without Resume Fraud", views: 1850, likes: 142, comments: 18, date: "May 28, 2026", status: "Published" },
  { id: "a3", title: "Zero Knowledge Proofs for Business Credentialing", views: 0, likes: 0, comments: 0, date: "Draft", status: "Draft" },
];

export default function ExpertArticles() {
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Published");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `a-${Date.now()}`,
      title,
      views: status === "Published" ? 12 : 0,
      likes: 0,
      comments: 0,
      date: status === "Published" ? new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }) : "Draft",
      status
    };
    setArticles([added, ...articles]);
    setShowModal(false);
    setTitle("");
    setContent("");
    toast.success(status === "Published" ? "Article successfully published!" : "Article saved as draft.");
  };

  const handleDelete = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    toast.info("Article removed.");
  };

  const filtered = articles.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <BookOpen size={22} className="text-primary" /> Community Articles
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Publish, write, and manage educational articles and platform publications.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Write Article
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map(art => (
            <div key={art.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow relative group">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-sm">{art.title}</h3>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${art.status === "Published" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}>
                    {art.status}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-semibold">Published on: {art.date}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1.5">
                  <span className="flex items-center gap-1"><Eye size={12} /> {art.views.toLocaleString()} Views</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={12} /> {art.likes} Likes</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {art.comments} Comments</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button onClick={() => toast.success(`Viewing analytics for ${art.title}`)} className="btn-secondary py-1.5 px-3 text-xs font-semibold">
                  Stats
                </button>
                <button onClick={() => handleDelete(art.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <BookOpen size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No articles published yet.</p>
            </div>
          )}
        </div>

        {/* Add Article Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-2xl shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Compose Educational Article</h3>
              <p className="text-xs text-muted-foreground mb-4">Share your knowledge and earn reputation points.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Article Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Navigating Verification Standards in Fintech" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Article Content (Markdown supported)</label>
                  <textarea required value={content} onChange={e => setContent(e.target.value)} rows={8} placeholder="Write your content here..." className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                      <span>Publish Status:</span>
                      <select value={status} onChange={e => setStatus(e.target.value)} className="px-2 py-1 rounded border border-border bg-card text-xs text-foreground">
                        <option value="Published">Publish Live</option>
                        <option value="Draft">Save Draft</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                    <button type="submit" className="btn-primary text-xs py-2 px-4">Save Article</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
