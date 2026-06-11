import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Lock, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract plan info from route state, fall back to Professional Plan as default
  const { planName = "Professional Plan", price = 29, billing = "monthly" } = location.state || {};

  // Form states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Flow states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  // Auto-format card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  // Auto-format expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    setExpiry(value);
  };

  // Auto-format CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCvv(value);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all card details.");
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    // Mock payment steps simulation
    setTimeout(() => {
      setProcessingStep(2);
    }, 1200);

    setTimeout(() => {
      setProcessingStep(3);
    }, 2400);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success("Payment authorized successfully!");
    }, 3600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            /* Success Screen */
            <div className="bg-card border border-emerald-500/20 rounded-3xl p-8 text-center shadow-2xl max-w-md mx-auto my-12 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Subscription Activated!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you! Your transaction has been confirmed on the TruNet validator node. Your professional trust score premium badges are now active.
              </p>
              
              <div className="bg-muted/40 rounded-2xl p-4 mb-6 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-semibold text-foreground">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-foreground">${price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span className="font-semibold capitalize text-foreground">{billing}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-[10px] text-primary">TXN_TRUNET_{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="btn-primary w-full py-3 justify-center text-sm font-semibold flex items-center gap-1.5"
              >
                Go to Dashboard <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            /* Checkout Screen */
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Order Summary (left columns) */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                    <Lock className="text-primary" size={20} /> Checkout
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete your subscription using our secure payment processor.
                  </p>
                </div>

                {/* Plan Card */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Selected Plan</span>
                      <h3 className="text-lg font-display font-bold text-foreground mt-0.5">{planName}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary capitalize font-medium">
                      {billing}
                    </span>
                  </div>

                  <div className="flex items-end gap-1 border-t border-border pt-4">
                    <span className="text-3xl font-display font-bold text-foreground">${price}</span>
                    <span className="text-xs text-muted-foreground pb-1">/month</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You will receive 14 days of free trial. After that, your card will be billed automatically on a recurring basis. Cancel anytime in account settings.
                  </p>
                </div>

                {/* Secure Trust Badges */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <ShieldCheck className="text-emerald-500" size={16} />
                    <span>KYC-Grade Validator Verification</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Lock className="text-primary" size={16} />
                    <span>256-bit SSL encrypted connection</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <HelpCircle className="text-muted-foreground" size={16} />
                    <span>Need help? Contact support@trunet.network</span>
                  </div>
                </div>
              </div>

              {/* Payment Details (right columns) */}
              <div className="md:col-span-3 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                {isProcessing ? (
                  /* Processing overlay */
                  <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-6"></div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {processingStep === 1 && "Verifying Card Credentials..."}
                      {processingStep === 2 && "Securing Node Connection..."}
                      {processingStep === 3 && "Finalizing Subscription..."}
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                      Please do not close this window or refresh. We are registering your secure subscription ledger.
                    </p>
                  </div>
                ) : null}

                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" /> Credit Card Details
                </h2>

                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="input-field font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="input-field text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        value={cvv}
                        onChange={handleCvvChange}
                        className="input-field text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mt-6">
                    <button
                      type="submit"
                      className="btn-primary w-full py-3 justify-center text-sm font-semibold flex items-center gap-1.5"
                    >
                      Authorize Payment & Start Trial
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
