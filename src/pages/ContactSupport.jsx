import React from "react";
import LeftPanel from "../components/LeftPanel";

export default function ContactSupport() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">

      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center px-12 py-16">
        <LeftPanel showLogin={true} />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-zinc-950 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Contact Support
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>Need help? Reach out to us.</p>

            <div className="bg-gray-100 rounded-xl p-4">
              <p className="font-semibold">📧 Email</p>
              <p>support@manthatech.com</p>

              <p className="font-semibold mt-3">⏱ Support Hours</p>
              <p>Mon – Fri, 9:00 AM – 6:00 PM</p>
            </div>

            <a href="/" className="underline font-medium">
              ← Back to Login
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
