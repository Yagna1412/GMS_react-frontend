import { useState } from "react";
import MonthlySpendingChart from "../components/Reports_components/MonthlySpendingChart";
import AverageServiceCostChart from "../components/Reports_components/AverageServiceCostChart";
import ServiceHistoryTable from "../components/Reports_components/ServiceHistoryTable";
import ReportsHeader from "../components/Reports_components/ReportsHeader";

export default function Reports() {

  const [months, setMonths] = useState(6);

  const services = [
    { id:1,date:"2026-02-16",service:"General Service",branch:"Downtown",amount:150 },
    { id:2,date:"2025-12-10",service:"Oil Change",branch:"Westside",amount:50 },
    { id:3,date:"2025-10-22",service:"Brake Inspection",branch:"Downtown",amount:80 },
    { id:4,date:"2025-08-14",service:"AC Repair",branch:"City Auto",amount:120 },
    { id:5,date:"2025-06-05",service:"Battery Replacement",branch:"AutoFix",amount:200 }
  ];

  const now = new Date();

  const filteredServices = services.filter((service) => {
    const serviceDate = new Date(service.date);

    const diffMonths =
      (now.getFullYear() - serviceDate.getFullYear()) * 12 +
      (now.getMonth() - serviceDate.getMonth());

    return diffMonths <= months;
  });

  return (
    <div className="min-h-screen bg-[#f3f6fb] p-10">

      {/* <ReportsHeader months={months} setMonths={setMonths} /> */}
           <ReportsHeader months={months} setMonths={setMonths}/>
      <div id="report-content">

        <div className="grid grid-cols-2 gap-6 mb-8">
          <MonthlySpendingChart services={filteredServices}/>
          <AverageServiceCostChart services={filteredServices}/>
        </div>

        <ServiceHistoryTable services={filteredServices}/>

      </div>

    </div>
  );
}