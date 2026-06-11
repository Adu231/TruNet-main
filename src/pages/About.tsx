import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles, TrendingUp, Users, Target, Heart, Globe, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedCounter from "@/components/features/AnimatedCounter";
import { STATS } from "@/constants";

const TEAM = [
  { name: "Alexandra Reid", title: "CEO & Co-founder", bio: "Former VP of Trust & Safety at a leading social platform. Passionate about building authentic professional ecosystems.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face" },
  { name: "Kwame Asante", title: "CTO & Co-founder", bio: "Ex-Google AI engineer. Built the AI matchmaking engine that powers TruNet's intelligent business recommendations.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
  { name: "Yuki Tanaka", title: "Head of Product", bio: "Product leader with 12+ years building B2B platforms. Previously at Salesforce and LinkedIn.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face" },
  { name: "Carlos Mena", title: "VP of Business Development", bio: "Former startup founder and investor. Now building the partnerships that make TruNet's ecosystem grow.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
];

const VALUES = [
  { icon: Shield, title: "Trust First", desc: "Every product decision starts with: does this build or protect trust? It is our non-negotiable foundation." },
  { icon: Users, title: "Humans Over Hype", desc: "We build for real professionals with real business goals — not vanity metrics or hollow connections." },
  { icon: Sparkles, title: "AI for Humans", desc: "Our AI is designed to amplify human judgment, not replace it. Recommendations are transparent and explainable." },
  { icon: Globe, title: "Global Inclusivity", desc: "Professional trust should have no borders. We build for professionals from Lagos to London to Los Angeles." },
  { icon: Target, title: "Earned Reputation", desc: "Credibility cannot be bought on TruNet. It is earned through consistent, verified professional conduct." },
  { icon: Heart, title: "Community Driven", desc: "TruNet grows because our community grows. We reinvest in the ecosystem that makes the platform valuable." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">About TruNet</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            We're Building the<br />
            <span className="gradient-text-brand">Trust Layer of Business</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TruNet was founded on a simple belief: the most valuable asset in business is not capital or connections — it is trust. We're building the infrastructure to make that trust verifiable, scalable, and actionable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Mission</span>
              <h2 className="text-3xl font-display font-bold text-foreground mb-5">
                Eliminating Uncertainty from Professional Relationships
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Before TruNet, professionals had no reliable way to verify who they were doing business with. Fake profiles, inflated credentials, and unverifiable claims made every business relationship a leap of faith.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-7">
                We changed that by building the world's first comprehensive professional trust infrastructure — combining identity verification, AI-powered reputation scoring, and a curated business ecosystem where every participant is accountable.
              </p>
              <Link to="/register" className="btn-primary">
                Join the Mission <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <div className="text-3xl font-display font-bold text-primary mb-1">
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">What We Stand For</h2>
            <p className="text-muted-foreground">The values that guide every product decision and company action.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-card border border-border card-hover">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">The Team Behind TruNet</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A team of builders, operators, and researchers obsessed with making professional trust scalable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative inline-block mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto shadow-card group-hover:shadow-card-hover transition-shadow duration-300"
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40" id="press">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border lg:left-1/2" />
            <div className="space-y-8">
              {[
                { year: "2022", event: "TruNet founded in San Francisco. Seed round of $4.2M led by Horizon Ventures." },
                { year: "2023", event: "Launched core verification platform. First 10,000 verified members onboarded in 90 days." },
                { year: "2024", event: "AI matchmaking engine launched. Series A of $18M. Expanded to 40+ countries." },
                { year: "2025", event: "Crossed 150,000 verified members. Lead marketplace launched. B2B partnerships with 3 enterprise CRM providers." },
                { year: "2026", event: "240,000+ members globally. $2.4B+ in facilitated business value. Series B in progress." },
              ].map((milestone, i) => (
                <div key={milestone.year} className={`flex gap-6 items-start ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} relative`}>
                  <div className="flex-1 lg:text-right lg:pr-8">
                    {i % 2 === 0 && (
                      <>
                        <div className="text-primary font-bold text-lg">{milestone.year}</div>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{milestone.event}</p>
                      </>
                    )}
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-brand text-white">
                      <Award size={18} />
                    </div>
                  </div>
                  <div className="flex-1 lg:pl-8">
                    {i % 2 !== 0 && (
                      <>
                        <div className="text-primary font-bold text-lg">{milestone.year}</div>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{milestone.event}</p>
                      </>
                    )}
                    {i % 2 === 0 && <div />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Be Part of the Story</h2>
          <p className="text-muted-foreground mb-6">Join 240,000+ professionals already building their business reputation on TruNet.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary justify-center">Join TruNet Free <ArrowRight size={15} /></Link>
            <Link to="/contact" className="btn-secondary justify-center">Partner With Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
