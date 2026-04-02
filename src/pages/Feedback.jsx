import React, { useState } from "react"
import FeedbackHeader from "../components/feedback_components/FeedbackHeader"
import Tabs from "../components/feedback_components/Tabs"
import MyReviews from "../components/feedback_components/MyReviews"
import SupportTickets from "../components/feedback_components/SupportTickets"
import RateService from "../components/feedback_components/Rateservice"
import NewTicketModal from "../components/feedback_components/NewTicketModal"

const Feedback = () => {

  const [activeTab, setActiveTab] = useState("reviews")
  const [reviews, setReviews] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [tickets, setTickets] = useState([])

  const addReview = (review) => {
    setReviews([review, ...reviews])
  }

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `#T${Date.now()}`,
      issue: ticketData.issue,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
      description: ticketData.description,
    };
    setTickets([newTicket, ...tickets]);
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] p-10">

      <FeedbackHeader setShowModal={setShowModal} setShowTicketModal={setShowTicketModal} />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "reviews" && <MyReviews reviews={reviews} />}
      {activeTab === "tickets" && <SupportTickets tickets={tickets} />}

      {showTicketModal && (
        <NewTicketModal
          onClose={() => setShowTicketModal(false)}
          onSubmit={addTicket}
        />
      )}

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