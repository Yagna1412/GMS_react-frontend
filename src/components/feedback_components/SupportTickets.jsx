import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import NewTicketModal from './NewTicketModal';

const SupportTickets = ({ tickets = [] }) => {

  const defaultTickets = [
    {
      id: "#T1",
      issue: "Billing Error",
      date: "2025-11-05",
      status: "Resolved",
    },
    {
      id: "#T2",
      issue: "Service Delay",
      date: "2026-02-15",
      status: "Open",
    },
  ]
  
  const allTickets = [...tickets, ...defaultTickets];
  const [editingTicket, setEditingTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]);

  const displayTickets = allTickets.filter(t => !deletedIds.includes(t.id));

  const handleModalSubmit = (ticketData) => {
    // Update existing ticket (you can add logic here later)
    setShowModal(false);
    setEditingTicket(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTicket(null);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeletedIds([...deletedIds, id]);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#BFDBFE] rounded-xl mt-6 shadow-sm">

      <div className="grid grid-cols-5 px-6 py-4 text-sm font-semibold text-[#64748B] border-b bg-[#EFF6FF] rounded-t-xl">
        <div>TICKET ID</div>
        <div>ISSUE</div>
        <div>DATE</div>
        <div>STATUS</div>
        <div className="text-right">ACTION</div>
      </div>

      {displayTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-none"
        >
          <div className="font-medium text-gray-800">
            {ticket.id}
          </div>

          <div className="text-gray-700">
            {ticket.issue}
          </div>

          <div className="text-gray-600">
            {ticket.date}
          </div>

          <div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                ticket.status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          <div className="text-right flex justify-end space-x-2">
            <button className="text-[#2563EB] hover:text-[#1E40AF] flex items-center space-x-1" onClick={() => handleEdit(ticket)}>
              <MdEdit size={16} />
              
            </button>
            <button className="text-[#DC2626] hover:text-[#B91C1C] flex items-center space-x-1" onClick={() => handleDelete(ticket.id)}>
              <MdDelete size={16} />
              
            </button>
          </div>
        </div>
      ))}
      {showModal && (
        <NewTicketModal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          isEditing={!!editingTicket}
          initialIssueType={editingTicket?.issue || ""}
          initialDescription={editingTicket?.description || ""}
        />
      )}
    </div>
  )
}

export default SupportTickets