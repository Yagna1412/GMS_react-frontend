import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Wallet } from "lucide-react";
import axios from "axios";

function SummaryCards() {
  const [totalDue, setTotalDue] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/invoices/summary");
        setTotalDue(response.data.totalDue);
        setTotalPaid(response.data.totalPaid);
        setCredits(response.data.credit);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    fetchSummary();
  }, []);

  const cards = [
    { label: "Total Due",  amount: `$${totalDue.toFixed(2)}`,  icon: <AlertCircle size={22} className="text-red-500" />, iconBg: "bg-red-100" },
    { label: "Total Paid", amount: `$${totalPaid.toFixed(2)}`, icon: <CheckCircle size={22} className="text-green-600" />, iconBg: "bg-green-100" },
    { label: "Credits",    amount: `$${credits.toFixed(2)}`,   icon: <Wallet size={22} className="text-blue-500" />,      iconBg: "bg-blue-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.label} className="p-6 rounded-xl flex justify-between items-center border shadow-sm bg-white border-blue-200">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{card.label}</p>
            <h3 className="text-2xl font-bold mt-2 text-slate-900">{card.amount}</h3>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;