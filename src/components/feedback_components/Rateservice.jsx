import { useState } from "react"

const RateService = ({ closeModal, addReview }) => {

  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")
  const [serviceType, setServiceType] = useState("")

  const handleSubmit = () => {
    if (!comment.trim() || !serviceType) return

    const newReview = {
      id: Date.now(),
      service: serviceType,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    }

    addReview(newReview)
    closeModal()
  }

  return (
    // 🔹 Overlay with blur + click outside close
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      {/* 🔹 Modal Card */}
      <div
        className="bg-white rounded-2xl p-6 w-[420px] shadow-xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >

        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Rate Your Experience
        </h2>

        {/* Service Type */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Service Type
          </label>

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          >
            <option value="">Select a service...</option>
            <option value="General Service">General Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Brake Service">Brake Service</option>
            <option value="Tire Service">Tire Service</option>
            <option value="Engine Repair">Engine Repair</option>
            <option value="Transmission Service">Transmission Service</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Electrical System">Electrical System</option>
            <option value="Body Work">Body Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Stars */}
        <div className="flex gap-2 mb-4 text-3xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:scale-110`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Tell us what you liked or how we can improve..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-6 items-center">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>

      </div>
    </div>
  )
}

export default RateService