import { useState } from "react";
import { DollarSign, ArrowRight, Download, Send, CreditCard, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_TRANSACTIONS = [
  { id: "tx1", client: "DataStream Corp", type: "Milestone Payout", amount: 2800, date: "June 8, 2026", status: "completed" },
  { id: "tx2", client: "Apex Consulting", type: "Retainer Payout", amount: 5800, date: "June 2, 2026", status: "completed" },
  { id: "tx3", client: "BlueWave Tech", type: "Contract Deposit", amount: 1500, date: "May 25, 2026", status: "pending" },
];

export default function FreelancerEarnings() {
  const [txs] = useState(INITIAL_TRANSACTIONS);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      toast.success("Withdrawal of $8,600 initiated to your linked bank account!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <DollarSign size={22} className="text-primary" /> Earnings & Invoicing
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Monitor project payout cycles, draw down balances, and track tax reports.</p>
          </div>
          <button onClick={handleWithdraw} disabled={isWithdrawing} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5">
            <CreditCard size={13} /> {isWithdrawing ? "Processing..." : "Withdraw Funds"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Available for Payout", value: "$8,600", desc: "Instantly withdrawable", color: "text-emerald-500" },
            { label: "Pending Clearance", value: "$1,500", desc: "Milestones in escrow", color: "text-yellow-500" },
            { label: "Total Earned YTD", value: "$72,600", desc: "47 completed contracts", color: "text-primary" },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <RefreshCw size={15} className="text-primary animate-pulse" /> Payout Transaction History
            </h3>
            <button onClick={() => toast.success("Invoices downloaded!")} className="text-xs text-primary hover:underline flex items-center gap-0.5">
              <Download size={12} /> Get Invoices
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted text-muted-foreground uppercase border-b border-border font-semibold">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Logged Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {txs.map(tx => (
                  <tr key={tx.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground">{tx.client}</td>
                    <td className="px-4 py-3">{tx.type}</td>
                    <td className="px-4 py-3 font-bold text-foreground">${tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{tx.date}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border",
                        tx.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      )}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
