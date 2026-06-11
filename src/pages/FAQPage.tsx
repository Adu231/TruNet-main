import { useState } from "react";
import { Search, ChevronDown, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FAQ_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "General", "Trust & Verification", "AI Features", "Freelance", "Security", "Billing"];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchSearch = !search || item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Help Center</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Frequently Asked <span className="gradient-text-brand">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to common questions about TruNet's features, verification, pricing, and more.
          </p>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all questions..."
              className="input-field pl-12 py-3.5 text-base"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  activeCategory === cat ? "bg-primary text-white border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="flex-1 font-medium text-foreground text-sm leading-relaxed">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn("text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200", openId === item.id && "rotate-180")}
                  />
                </button>
                {openId === item.id && (
                  <div className="px-6 pb-5 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={36} className="text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">No results found</h3>
              <p className="text-sm text-muted-foreground">Try different keywords or browse by category.</p>
            </div>
          )}

          {/* Still need help */}
          <div className="mt-12 p-6 rounded-2xl bg-muted/60 border border-border text-center">
            <MessageCircle size={28} className="text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our team is here to help. Reach out and we will get back to you within 24 hours.</p>
            <Link to="/contact" className="btn-primary">Contact Support</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
