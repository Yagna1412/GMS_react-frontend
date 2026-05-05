import React from "react";
import axios from "axios";
import SummaryCards from "../../components/customer/invoice/SummaryCards";
import InvoiceTable from "../../components/customer/invoice/InvoiceTable";
import generateStatementPDF from "../../components/customer/invoice/utils/generateStatementPDF";


function Invoices() {

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/invoices/statement");
      generateStatementPDF(response.data);
    } catch (error) {
      console.error("Error downloading statement:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-[1200px] mx-auto px-8 py-10">

        <div className="flex flex-col items-center gap-4 mb-8 lg:flex-row lg:justify-between lg:items-center">
          <h2 className="text-3xl font-bold text-center lg:text-left text-slate-800">
            Invoices &amp; Payments
          </h2>
          <button onClick={handleDownload}
            className="text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition hover:opacity-90 bg-blue-600">
            Download Statement
          </button>
        </div>

        <SummaryCards />

        <div className="mt-8">
          <InvoiceTable />
        </div>

      </div>
    </div>
  );
}

export default Invoices;