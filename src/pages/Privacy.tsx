import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Legal</span>
            <h1 className="text-4xl font-display font-bold text-foreground mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 1, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            {[
              {
                title: "1. Information We Collect",
                content: `We collect information you provide directly to us when you create an account, complete your profile, or contact us for support. This includes:

• Identity information: name, email address, phone number, profile photo
• Professional information: job title, company, work history, skills, certifications
• Verification data: government-issued ID documents processed by our KYC partner (never stored on TruNet servers after verification)
• Business information: company registration details, business category, service descriptions
• Usage data: platform activity, connections, messages, lead interactions
• Device and technical data: IP address, browser type, operating system, referral URLs`,
              },
              {
                title: "2. How We Use Your Information",
                content: `We use the information we collect to:

• Create and manage your verified professional profile
• Calculate and maintain your Trust Score
• Provide AI-powered matchmaking and recommendations
• Facilitate connections, messaging, and business transactions
• Send you platform notifications, security alerts, and service updates
• Improve our AI systems and platform features
• Detect and prevent fraud, abuse, and unauthorized access
• Comply with legal obligations and enforce our Terms of Service`,
              },
              {
                title: "3. Information Sharing",
                content: `We do not sell your personal information. We share your information only:

• With other TruNet members as part of your visible profile (based on your privacy settings)
• With our verified KYC partner to process identity verification (data is not retained by TruNet)
• With service providers who help us operate the platform (analytics, email, cloud infrastructure)
• When required by law, court order, or government authority
• In connection with a merger, acquisition, or sale of company assets (with notice provided to you)`,
              },
              {
                title: "4. Data Security",
                id: "security",
                content: `TruNet implements industry-leading security measures:

• AES-256 encryption for all data at rest
• TLS 1.3 encryption for all data in transit
• SOC 2 Type II certified infrastructure
• Regular third-party penetration testing
• Role-based access controls for all employee data access
• 90-day access log retention for security auditing
• Automatic session timeouts and device verification`,
              },
              {
                title: "5. Cookies & Tracking",
                id: "cookies",
                content: `We use cookies and similar technologies to:

• Keep you signed in across sessions
• Remember your preferences (theme, language, notification settings)
• Analyze platform usage to improve features
• Prevent fraudulent activity

You can manage cookie preferences in your browser settings. Note that disabling certain cookies may affect platform functionality.`,
              },
              {
                title: "6. Your Rights (GDPR & CCPA)",
                id: "gdpr",
                content: `Depending on your location, you have the following rights:

• Access: Request a copy of all personal data we hold about you
• Correction: Update or correct inaccurate information
• Deletion: Request that we delete your account and associated data
• Portability: Export your profile data in a machine-readable format
• Opt-out: Withdraw consent for non-essential data processing
• Restriction: Request that we limit how we use your data

To exercise these rights, email privacy@trunet.ai or visit your Account Settings.`,
              },
              {
                title: "7. Contact",
                content: `For privacy-related inquiries:

Email: privacy@trunet.ai
Address: TruNet Inc., 101 Market Street Suite 400, San Francisco, CA 94105
Data Protection Officer: dpo@trunet.ai`,
              },
            ].map((section) => (
              <div key={section.title} id={section.id} className="border-b border-border pb-8 last:border-0">
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">{section.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-muted/60 border border-border">
            <p className="text-sm text-muted-foreground">
              Questions about this policy?{" "}
              <Link to="/contact" className="text-primary hover:underline">Contact our privacy team</Link> or email{" "}
              <a href="mailto:privacy@trunet.ai" className="text-primary hover:underline">privacy@trunet.ai</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
