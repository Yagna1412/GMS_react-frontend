import { useParams, useNavigate } from "react-router-dom";
import jobsData from "../data/jobsData";
import { CheckCircle, ArrowLeft, User, Car, Wrench } from "lucide-react";

function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find((j) => j.id === Number(id));

  if (!job) {
    return <div className="p-10 text-xl">Job not found</div>;
  }

  const steps = ["Created", "In Service", "QC", "Ready"];

  const step =
    job.status === "Booked"
      ? 1
      : job.status === "In Progress"
      ? 2
      : 4;

  const serviceTotal = job.services.reduce((sum, s) => sum + s.price, 0);
  const gst = Math.round(serviceTotal * 0.18);
  const total = serviceTotal + gst;

  return (
    <div className="p-8 bg-gray-100 min-h-screen max-w-5xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        {job.title}
      </h1>

      {/* Progress Tracker */}
      <div className="bg-white p-8 rounded-xl shadow mb-6">

        <div className="flex items-center justify-between relative">

          {steps.map((item, index) => {

            const active = step >= index + 1;

            return (

              <div key={item} className="flex-1 flex flex-col items-center relative">

                {index !== steps.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-1 ${
                    step > index + 1 ? "bg-green-500" : "bg-gray-300"
                  }`} />
                )}

                <CheckCircle
                  size={32}
                  className={
                    active
                      ? "text-green-500 z-10 bg-white"
                      : "text-gray-300 z-10 bg-white"
                  }
                />

                <p
                  className={`text-sm mt-2 ${
                    active
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {item}
                </p>

              </div>

            );

          })}

        </div>

      </div>

      {/* Customer + Vehicle */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <User size={18} />
            Customer Details
          </h2>

          <p><b>Name:</b> {job.customer}</p>
          <p><b>Service Center:</b> {job.location}</p>
          <p><b>Booked Date:</b> {job.date}</p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Car size={18} />
            Vehicle Information
          </h2>

          <p><b>Vehicle:</b> {job.vehicle}</p>
          <p><b>Car Number:</b> {job.carNumber}</p>

        </div>

      </div>

      {/* Mechanic */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Wrench size={18} />
          Assigned Mechanic
        </h2>

        <p><b>Name:</b> {job.mechanic}</p>
        <p><b>Experience:</b> 8 Years</p>
        <p><b>Status:</b> {job.status}</p>

      </div>

      {/* Service Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="font-semibold mb-4">
          Service Breakdown
        </h2>

        <table className="w-full">

          <tbody>

            {job.services.map((service, i) => (

              <tr key={i} className="border-b">

                <td className="py-2">
                  {service.name}
                </td>

                <td className="py-2 text-right">
                  ₹{service.price}
                </td>

              </tr>

            ))}

            <tr className="border-b font-semibold">

              <td className="py-2">
                Service Total
              </td>

              <td className="py-2 text-right">
                ₹{serviceTotal}
              </td>

            </tr>

            <tr className="border-b">

              <td className="py-2">
                GST (18%)
              </td>

              <td className="py-2 text-right">
                ₹{gst}
              </td>

            </tr>

            <tr className="font-bold text-lg">

              <td className="py-3">
                Total
              </td>

              <td className="py-3 text-right text-blue-600">
                ₹{total}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Bill Summary */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="font-semibold mb-4">
          Bill Summary
        </h2>

        <table className="w-full">

          <thead className="border-b text-gray-500">

            <tr>
              <th className="text-left pb-2">Service</th>
              <th className="text-right pb-2">Price</th>
            </tr>

          </thead>

          <tbody>

            {job.services.map((service, i) => (

              <tr key={i} className="border-b">

                <td className="py-2">
                  {service.name}
                </td>

                <td className="py-2 text-right">
                  ₹{service.price}
                </td>

              </tr>

            ))}

            <tr className="font-bold">

              <td className="py-2">
                Grand Total
              </td>

              <td className="py-2 text-right text-blue-600">
                ₹{total}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">

        <button
          className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50"
          onClick={() => alert("Chat with Advisor")}
        >
          Chat with Advisor
        </button>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => alert("QC Report")}
        >
          View QC Report
        </button>

      </div>

    </div>
  );
}

export default JobDetails;