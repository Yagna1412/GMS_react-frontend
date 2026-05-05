
import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function ReportsHeader({ months, setMonths }) {

  const [showPopup, setShowPopup] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("report-content");

    if (!element) {
      alert("Report content not found");
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("service-report.pdf");

    setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }, 800);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-8">

      <h2 className="font-bold text-lg text-[#1E3A8A]">
        Reports & History
      </h2>

      <div className="flex items-center gap-3">

        <div className="flex items-center border border-[#BFDBFE] rounded-md px-3 py-2 bg-white hover:bg-[#EFF6FF]">
          <FaCalendarAlt className="text-[#64748B] mr-2" />

          <select
            value={months}
            onChange={(e)=>setMonths(Number(e.target.value))}
            className="bg-transparent outline-none text-[#1E3A8A] text-sm"
          >
            <option value={3}>Last 3 Months</option>
            <option value={6}>Last 6 Months</option>
            <option value={12}>Last 12 Months</option>
            <option value={18}>Last 18 Months</option>
            <option value={24}>Last 24 Months</option>
          </select>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center bg-[#3B82F6] text-white px-4 py-2 rounded-md hover:bg-[#2563EB] transition"
        >
          <FaDownload className="mr-2" />
          Export PDF
        </button>

      </div>

      {showPopup && (
        <div className="fixed bottom-6 right-6 bg-[#2563EB] text-white px-4 py-2 rounded shadow-lg">
          Your file has downloaded ✅
        </div>
      )}

    </div>
  );
}

