import { FaStar, FaRegStar } from "react-icons/fa"

const MyReviews = ({ reviews = [] }) => {

  const defaultReviews = [
    {
      id: "d1",
      rating: 4,
      service: "General Service - Downtown Center",
      date: "12 Oct 2025",
      comment:
        "Excellent service! The team was very professional and delivered my car on time.",
    },
    {
      id: "d2",
      rating: 5,
      service: "General Service - Downtown Center",
      date: "12 Oct 2025",
      comment:
        "Good job, but the waiting area could be better.",
    },
  ]

  const allReviews = [...reviews, ...defaultReviews]

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1,2,3,4,5].map((star) =>
          star <= rating ? (
            <FaStar key={star} className="text-yellow-400 text-lg" />
          ) : (
            <FaRegStar key={star} className="text-gray-300 text-lg" />
          )
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-6">
      {allReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-start"
        >

          {/* LEFT SIDE */}
          <div className="flex gap-5">

            {/* Rating Circle */}
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
              {review.rating}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {review.service}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {review.date}
              </p>

              <p className="text-gray-700 mt-3 max-w-xl">
                {review.comment}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE STARS */}
          <div className="mt-1">
            {renderStars(review.rating)}
          </div>

        </div>
      ))}
    </div>
  )
}

export default MyReviews