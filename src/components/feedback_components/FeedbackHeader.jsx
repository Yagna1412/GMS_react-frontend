import { FiStar, FiPlus } from "react-icons/fi"

const FeedbackHeader = ({ setShowModal, setShowTicketModal }) => {
  return (
    <div className="flex justify-between items-center mb-8">

      <h1 className="text-2xl font-semibold text-gray-900">
        Support & Feedback
      </h1>

      <div className="flex gap-3">

        {/* Rate Service */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-200 transition"
        >
          <FiStar size={18} />
          Rate Service
        </button>

        {/* New Ticket */}
        <button
          onClick={() => setShowTicketModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition"
        >
          <FiPlus size={18} />
          New Ticket
        </button>

      </div>
    </div>
  )
}

export default FeedbackHeader