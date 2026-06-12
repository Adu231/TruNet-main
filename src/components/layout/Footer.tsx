import { Link } from "react-router-dom";
import { Shield, Twitter, Linkedin, Github, Mail, ArrowRight } from "lucide-react";
import TruNetLogo from "@/components/features/TruNetLogo";
import { toast } from "sonner";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "AI Matchmaking", href: "/features#ai-matchmaking" },
    { label: "Trust Score", href: "/features#verified-identity" },
  ],
  Company: [
    { label: "About TruNet", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  Resources: [
    { label: "Help Center", href: "/faq" },
    { label: "FAQ", href: "/faq" },
    { label: "Community", href: "/dashboard/community" },
    { label: "API Docs", href: "/api-docs" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Security", href: "/security" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export default function Footer() {
  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("newsletter_email");
    toast.success(`Subscribed successfully! Updates will be sent to ${email}`);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-foreground/[0.02] dark:bg-white/[0.02] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <TruNetLogo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The trusted platform for verified professional networking, business partnerships, and reputation building.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Mail, href: "/contact", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-sm font-semibold text-foreground mb-4">{category}</p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={() => {
                          const [path, hash] = link.href.split("#");
                          if (window.location.pathname === path) {
                            if (hash) {
                              const el = document.getElementById(hash);
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                              }
                            } else {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold text-foreground mb-2">Stay Updated</p>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest on professional networking, trust insights, and platform updates.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                name="newsletter_email"
                placeholder="Your email address"
                className="input-field text-sm"
                required
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield size={14} className="text-primary" />
            <span>© 2026 TruNet Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span>·</span>
            <span>SOC 2 Type II Certified</span>
            <span>·</span>
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
