import React from "react";

const MyVehicles = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#1E3A8A]">My Vehicles</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 text-center text-gray-500">
        You have no vehicles registered yet.
      </div>
    </div>
  );
};

export default MyVehicles;