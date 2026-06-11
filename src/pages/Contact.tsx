import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Loader2, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CONTACT_OPTIONS = [
  { icon: MessageSquare, title: "Sales & Partnerships", desc: "Discuss enterprise plans, partnerships, or custom solutions.", email: "sales@trunet.ai", time: "1-2 business days" },
  { icon: Mail, title: "Support", desc: "Get help with your account, features, or technical issues.", email: "support@trunet.ai", time: "Within 24 hours" },
  { icon: Phone, title: "Press & Media", desc: "Media inquiries, interviews, and press kit requests.", email: "press@trunet.ai", time: "2-3 business days" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.length < 2) errs.name = "Please enter your name.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email.";
    if (!form.subject) errs.subject = "Please enter a subject.";
    if (form.message.length < 20) errs.message = "Message must be at least 20 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Message sent! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            We're Here to <span className="gradient-text-brand">Help</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or want to explore how TruNet can work for your business? Reach out to us.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {CONTACT_OPTIONS.map((opt) => (
              <div key={opt.title} className="p-6 rounded-2xl border border-border bg-card card-hover">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <opt.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{opt.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{opt.desc}</p>
                <a href={`mailto:${opt.email}`} className="text-sm text-primary font-medium hover:underline block mb-1">{opt.email}</a>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={11} /> Response: {opt.time}
                </div>
              </div>
            ))}
          </div>

          {/* Main Form */}
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                {!sent ? (
                  <>
                    <h2 className="text-xl font-display font-bold text-foreground mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className={cn("input-field", errors.name && "border-destructive")}
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@company.com"
                            className={cn("input-field", errors.email && "border-destructive")}
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="input-field"
                        >
                          {["General Inquiry", "Sales / Enterprise", "Technical Support", "Partnership", "Press / Media", "Bug Report"].map((t) => (
                            <option key={t} value={t.toLowerCase().replace(/\s+/g, "_")}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                        <input
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="How can we help?"
                          className={cn("input-field", errors.subject && "border-destructive")}
                        />
                        {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          className={cn("input-field resize-none", errors.message && "border-destructive")}
                        />
                        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                      </div>

                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60">
                        {loading ? <><Loader2 size={17} className="animate-spin" /> Sending…</> : "Send Message"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-xl font-display font-bold text-foreground mb-2">Message Received!</h2>
                    <p className="text-muted-foreground mb-6">Thank you for reaching out. We will get back to you within 24 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "", type: "general" }); }} className="btn-secondary">
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Office Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>101 Market Street, Suite 400<br />San Francisco, CA 94105</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-primary flex-shrink-0" />
                    <span>hello@trunet.ai</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-primary flex-shrink-0" />
                    <span>+1 (415) 867-5309</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-primary flex-shrink-0" />
                    <span>Mon–Fri, 9:00 AM – 6:00 PM PST</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-2 text-sm">Enterprise Solutions</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Looking for custom enterprise plans, API integration, or white-label solutions? Our enterprise team can help.
                </p>
                <a href="mailto:enterprise@trunet.ai" className="text-sm text-primary font-medium hover:underline">enterprise@trunet.ai</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
