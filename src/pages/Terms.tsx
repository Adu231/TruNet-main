import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Legal</span>
            <h1 className="text-4xl font-display font-bold text-foreground mb-3">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 1, 2026 · Effective: June 1, 2026</p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By creating a TruNet account or using any TruNet service, you agree to these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use TruNet. These terms apply to all users including professionals, businesses, freelancers, recruiters, and enterprises.",
              },
              {
                title: "2. Account Registration & Eligibility",
                content: "You must be at least 18 years old to create a TruNet account. You agree to provide accurate, complete, and current information during registration. You are responsible for maintaining the security of your account credentials. You may not create accounts on behalf of others without their explicit consent. Each person may maintain only one personal TruNet account.",
              },
              {
                title: "3. Verified Identity & Trust Score",
                content: "TruNet offers optional identity verification (KYC) through a certified third-party provider. Providing false documents for verification is grounds for immediate permanent account termination and may be reported to relevant authorities. Your Trust Score is calculated algorithmically based on your platform activity, peer reviews, and verification status. TruNet makes no guarantees that your Trust Score will reach any specific value.",
              },
              {
                title: "4. User Conduct",
                content: `You agree NOT to:
• Create fake, misleading, or impersonation profiles
• Spam, harass, or threaten other users
• Post false or defamatory reviews or endorsements
• Attempt to manipulate your Trust Score artificially
• Use TruNet to conduct illegal business activities
• Scrape, harvest, or extract user data using automated tools
• Circumvent any platform security or authentication measures
• Use TruNet for multi-level marketing or pyramid schemes`,
              },
              {
                title: "5. Professional Content & Listings",
                content: "You are solely responsible for content you post including service listings, job postings, project descriptions, and proposals. All listings must accurately represent your actual services, skills, and business capabilities. Misleading service listings may result in account suspension. TruNet reserves the right to remove any content that violates these terms without notice.",
              },
              {
                title: "6. Transactions & Payments",
                content: "TruNet facilitates introductions and business connections but is not a party to any contract or transaction formed between members. Subscription fees are billed in advance and are non-refundable except where required by applicable law. TruNet reserves the right to change pricing with 30 days notice to current subscribers.",
              },
              {
                title: "7. Intellectual Property",
                content: "TruNet and its licensors own all intellectual property rights in the platform, including software, design, trademarks, and AI models. You grant TruNet a limited, non-exclusive license to display your profile content to make the platform work. You retain all rights to content you create and post on TruNet.",
              },
              {
                title: "8. Limitation of Liability",
                content: "TruNet provides its platform on an 'as is' basis. We do not guarantee that any business connection, lead, or partnership facilitated through the platform will result in a successful transaction. TruNet's total liability for any claim shall not exceed the amount you paid to TruNet in the 12 months preceding the claim.",
              },
              {
                title: "9. Termination",
                content: "TruNet may suspend or terminate your account at any time for violation of these terms, suspected fraud, or at our discretion with 30 days notice for non-violation cases. You may delete your account at any time from Account Settings. Upon termination, your public profile will be removed though we may retain certain data as required by law.",
              },
              {
                title: "10. Governing Law",
                content: "These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding arbitration in San Francisco, California, except for claims that qualify for small claims court.",
              },
            ].map((section) => (
              <div key={section.title} className="border-b border-border pb-8 last:border-0">
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">{section.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-muted/60 border border-border">
            <p className="text-sm text-muted-foreground">
              Questions about these terms?{" "}
              <Link to="/contact" className="text-primary hover:underline">Contact our legal team</Link> or email{" "}
              <a href="mailto:legal@trunet.ai" className="text-primary hover:underline">legal@trunet.ai</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
