import { useState } from "react";
import { BookOpen, Search, Plus, MessageSquare, ThumbsUp, Send, User, Tag, Share2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_POSTS = [
  {
    id: "p1",
    author: "Sarah Mitchell",
    title: "How Trust Scores Are Reshaping B2B Networking in 2026",
    content: "We noticed that connecting with KYC verified profiles has sped up our vendor contract closure by over 60%. Highly recommend upgrading your company profiles to get the verification badge.",
    likes: 24,
    hasLiked: false,
    tags: ["Trust & Verification", "Strategy"],
    comments: [
      { author: "Alex Johnson", text: "Completely agree! It saves hours of due diligence.", date: "1h ago" }
    ],
    showComments: false,
    newComment: ""
  },
  {
    id: "p2",
    author: "James Okonkwo",
    title: "The Future of AI Matchmaking Engine in SaaS Partnerships",
    content: "Analyzing over 200 data points to find strategic partnerships might sound like hype, but our conversion rates are currently at 89% vs cold outreach. The matchmaking recommendations are spot on.",
    likes: 18,
    hasLiked: false,
    tags: ["AI Features", "Technology"],
    comments: [],
    showComments: false,
    newComment: ""
  }
];

export default function DashboardCommunity() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPostData, setNewPostData] = useState({ title: "", tags: "General", content: "" });

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const diff = p.hasLiked ? -1 : 1;
          return {
            ...p,
            hasLiked: !p.hasLiked,
            likes: p.likes + diff
          };
        }
        return p;
      })
    );
  };

  const toggleComments = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, showComments: !p.showComments } : p))
    );
  };

  const handleAddComment = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (!p.newComment.trim()) return p;
          const newCommentObj = {
            author: "You",
            text: p.newComment.trim(),
            date: "Just now"
          };
          toast.success("Comment added!");
          return {
            ...p,
            comments: [...p.comments, newCommentObj],
            newComment: ""
          };
        }
        return p;
      })
    );
  };

  const handleCommentChange = (id: string, value: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, newComment: value } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostData.title || !newPostData.content) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const createdPost = {
      id: `p-${Date.now()}`,
      author: "You",
      title: newPostData.title,
      content: newPostData.content,
      likes: 1,
      hasLiked: true,
      tags: [newPostData.tags],
      comments: [],
      showComments: false,
      newComment: ""
    };
    setPosts([createdPost, ...posts]);
    setShowModal(false);
    setNewPostData({ title: "", tags: "General", content: "" });
    toast.success("Community post published successfully!");
  };

  const filtered = posts.filter((p) => {
    const term = search.toLowerCase();
    return !search || p.title.toLowerCase().includes(term) || p.content.toLowerCase().includes(term);
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <BookOpen size={22} className="text-primary" />
              Community Forum
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Discuss B2B strategies, share trust metrics reviews, and build connections in our public forum.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-sm py-2"
          >
            <Plus size={15} /> Create Post
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discussion threads..."
            className="input-field pl-10 py-2 text-sm"
          />
        </div>

        {/* Post Stream */}
        <div className="space-y-5 max-w-4xl">
          {filtered.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-foreground">{post.author}</span>
                  <span>·</span>
                  <span>Published on TruNet Feed</span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                    <Tag size={9} className="inline mr-1" /> {tag}
                  </span>
                ))}
              </div>

              {/* Feed Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
                <button
                  onClick={() => handleLike(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 font-medium hover:text-primary transition-colors",
                    post.hasLiked && "text-primary"
                  )}
                >
                  <ThumbsUp size={13} className={cn(post.hasLiked && "fill-primary")} /> {post.likes} Upvotes
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors"
                >
                  <MessageSquare size={13} /> {post.comments.length} Comments
                </button>
                <button
                  onClick={() => { toast.success("Shared discussion link to clipboard!"); }}
                  className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors ml-auto"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>

              {/* Comments block */}
              {post.showComments && (
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="space-y-3">
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="flex gap-2.5 p-3 rounded-xl bg-muted/40 text-xs">
                        <div className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold flex-shrink-0">
                          {c.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-semibold text-foreground">{c.author}</span>
                            <span className="text-[9px] text-muted-foreground">{c.date}</span>
                          </div>
                          <p className="text-muted-foreground">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add comment form */}
                  <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex gap-2">
                    <input
                      value={post.newComment}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Add a comment..."
                      className="input-field flex-1 py-1.5 text-xs"
                    />
                    <button type="submit" className="btn-primary px-3 py-1.5 text-xs">
                      <Send size={11} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No posts found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Create Forum Post</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Post Title</label>
                <input
                  value={newPostData.title}
                  onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                  placeholder="e.g. Tips for scaling B2B partnerships"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tags</label>
                <select
                  value={newPostData.tags}
                  onChange={(e) => setNewPostData({ ...newPostData, tags: e.target.value })}
                  className="input-field"
                >
                  <option>Trust & Verification</option>
                  <option>AI Features</option>
                  <option>Technology</option>
                  <option>Strategy</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Post Content</label>
                <textarea
                  value={newPostData.content}
                  onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                  rows={4}
                  placeholder="Write your discussion details here..."
                  className="input-field resize-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
