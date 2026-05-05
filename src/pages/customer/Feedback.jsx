import React, { useState, useEffect } from "react";
import FeedbackHeader from "../../components/customer/feedback/FeedbackHeader";
import Tabs from "../../components/customer/feedback/Tabs";
import MyReviews from "../../components/customer/feedback/MyReviews";
import SupportTickets from "../../components/customer/feedback/SupportTickets";
import RateService from "../../components/customer/feedback/Rateservice";
import NewTicketModal from "../../components/customer/feedback/NewTicketModal";
import { getReviews, submitReview, getTickets, createTicket, updateTicket, deleteTicket } from "../../components/customer/feedback/feedbackApi";
import { useAuth } from "../../components/customer/feedback/AuthContext";

const Feedback = () => {

  // ── Get customerId from AuthContext ────────────────────
  // Change the value in AuthContext.jsx when you add login
  const { customerId } = useAuth();

  const [activeTab, setActiveTab] = useState("reviews")
  const [reviews, setReviews] = useState([])
  const [tickets, setTickets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── Load reviews when My Reviews tab is active ─────────
  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);

  // ── Load tickets when Support Tickets tab is active ────
  useEffect(() => {
    if (activeTab === "tickets") {
      fetchTickets();
    }
  }, [activeTab]);

  // ── Fetch all reviews ──────────────────────────────────
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews(customerId);
      setReviews(data);
    } catch (err) {
      setError("Failed to load reviews. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch all tickets ──────────────────────────────────
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets(customerId);
      setTickets(data);
    } catch (err) {
      setError("Failed to load tickets. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Submit a new review ────────────────────────────────
  const addReview = async (reviewData) => {
    try {
      const payload = {
        customerId: customerId,
        serviceType: reviewData.service,
        overallRating: reviewData.rating,
        comments: reviewData.comment,
      };
      const newReview = await submitReview(payload);
      setReviews((prev) => [newReview, ...prev]);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error(err);
    }
  };

  // ── Create a new ticket ────────────────────────────────
  const addTicket = async (ticketData) => {
    try {
      const payload = {
        customerId: customerId,
        issueType: ticketData.issue,
        description: ticketData.description,
        attachmentPath: null,
      };
      const newTicket = await createTicket(payload);
      setTickets((prev) => [newTicket, ...prev]);
    } catch (err) {
      setError("Failed to create ticket. Please try again.");
      console.error(err);
    }
  };

  // ── Update a ticket ────────────────────────────────────
  const handleUpdateTicket = async (id, ticketData) => {
    try {
      const payload = {
        issueType: ticketData.issue,
        description: ticketData.description,
        status: ticketData.status || undefined,
      };
      await updateTicket(id, payload);
      await fetchTickets(); // Refetch to get latest data
    } catch (err) {
      setError("Failed to update ticket. Please try again.");
      console.error(err);
    }
  };

  // ── Delete a ticket ────────────────────────────────────
  const handleDeleteTicket = async (id) => {
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete ticket. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF] p-10">

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold">✕</button>
        </div>
      )}

      <FeedbackHeader
        setShowModal={setShowModal}
        setShowTicketModal={setShowTicketModal}
      />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Loading indicator */}
      {loading && (
        <div className="text-center text-gray-500 mt-10">Loading...</div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && !loading && (
        <MyReviews reviews={reviews} />
      )}

      {/* Tickets Tab */}
      {activeTab === "tickets" && !loading && (
        <SupportTickets
          tickets={tickets}
          onUpdate={handleUpdateTicket}
          onDelete={handleDeleteTicket}
        />
      )}

      {/* New Ticket Modal */}
      {showTicketModal && (
        <NewTicketModal
          onClose={() => setShowTicketModal(false)}
          onSubmit={addTicket}
        />
      )}

      {/* Rate Service Modal */}
      {showModal && (
        <RateService
          closeModal={() => setShowModal(false)}
          addReview={addReview}
        />
      )}

    </div>
  )
}

export default Feedback