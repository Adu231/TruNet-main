import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Clock, ArrowRight, Tag, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES = ["All", "Trust & Verification", "AI & Technology", "Strategy", "Freelance", "Recruitment"];

export default function Blog() {
  const { slug } = useParams<{ slug: string }>();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || post.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featured = BLOG_POSTS[0];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("blog_email");
    toast.success(`Subscribed successfully! Weekly insights will be sent to ${email}`);
    e.currentTarget.reset();
  };

  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
      return (
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="pt-32 pb-20 px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ChevronRight className="rotate-180" size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="trust-badge bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.readTime} min read</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p className="text-lg text-foreground font-medium">{post.excerpt}</p>
            <p>
              Trust is the currency of the modern B2B economy. Without verified profiles, platforms quickly devolve into a series of spam messages, inflated CVs, and fake recommendations. On TruNet, we built a protocol that leverages multi-factor trust credentials so that every connection represents a real professional.
            </p>
            <h3 className="text-xl font-bold text-foreground mt-8">Building Credibility in a Connected World</h3>
            <p>
              A complete reputation strategy on the platform involves verifying your corporate credentials or individual KYC, collecting verified reviews from clients, and participating in expert discussions. Members who complete their profile see a substantial lift in connection acceptance rates and inbound lead quality.
            </p>
            <p>
              As professional relationships shift increasingly online, the platforms that succeed will be those that verify identity first. TruNet is leading this charge, helping thousands of companies scale their operations safely and securely.
            </p>
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">TruNet Blog</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Insights on Trust,<br />
            <span className="gradient-text-brand">Networking & Growth</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Expert articles on professional networking, business trust, AI-powered lead generation, and reputation building.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="input-field pl-11 py-3 text-base"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to={`/blog/${featured.slug}`} className="block group">
            <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8 rounded-3xl border border-border bg-card card-hover overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="trust-badge bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {featured.category}
                  </span>
                  <span className="text-xs text-muted-foreground">Featured</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img src={featured.authorAvatar} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-foreground">{featured.author}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{featured.date}</span>
                  <span className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock size={11} /> {featured.readTime} min read
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-1 text-primary font-medium text-sm">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  activeCategory === cat ? "bg-primary text-white border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                <article className="bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="trust-badge bg-white/90 dark:bg-black/60 text-foreground/80 text-[10px]">
                        <Tag size={9} /> {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-display font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-muted-foreground flex-1">{post.date}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={10} /> {post.readTime}m
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={36} className="text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">No articles found</h3>
              <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Stay Ahead of the Curve</h2>
          <p className="text-muted-foreground mb-6">Get weekly insights on professional trust, networking strategies, and AI-powered business growth.</p>
          <form className="flex gap-3 max-w-sm mx-auto" onSubmit={handleSubscribe}>
            <input type="email" name="blog_email" placeholder="Enter your email" className="input-field flex-1" required />
            <button type="submit" className="btn-primary flex-shrink-0">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
