const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-6 border-b border-[#BFDBFE] mb-6">
      <button
        onClick={() => setActiveTab("reviews")}
        className={`pb-2 ${
          activeTab === "reviews"
            ? "border-b-2 border-[#2563EB] text-[#2563EB]"
            : "text-[#64748B]"
        }`}
      >
        My Reviews
      </button>

      <button
        onClick={() => setActiveTab("tickets")}
        className={`pb-2 ${
          activeTab === "tickets"
            ? "border-b-2 border-[#2563EB] text-[#2563EB]"
            : "text-[#64748B]"
        }`}
      >
        Support Tickets
      </button>
    </div>
  )
}

export default Tabs