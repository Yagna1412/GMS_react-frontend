import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-8 border-b-2 border-[#E5E7EB]">
      <button
        onClick={() => setActiveTab("reviews")}
        className={`pb-4 font-semibold text-base transition ${
          activeTab === "reviews"
            ? "border-b-3 border-[#2563EB] text-[#2563EB] -mb-[2px]"
            : "text-[#6B7280] hover:text-[#374151]"
        }`}
      >
        My Reviews
      </button>

      <button
        onClick={() => setActiveTab("tickets")}
        className={`pb-4 font-semibold text-base transition ${
          activeTab === "tickets"
            ? "border-b-3 border-[#2563EB] text-[#2563EB] -mb-[2px]"
            : "text-[#6B7280] hover:text-[#374151]"
        }`}
      >
        Support Tickets
      </button>
    </div>
  );
};

export default Tabs;