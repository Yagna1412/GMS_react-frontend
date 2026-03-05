import React from "react";

export default function LoginCard({ goToSignup }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

      <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>

      <form className="space-y-4">

        <div>
          <label className="text-sm block mb-1 font-medium"> Username</label>
          <input className="input" placeholder="Enter username" />
        </div>

        <div>
          <label className="text-sm block mb-1 font-medium">Password</label>
          <input type="password" className="input" placeholder="••••••••" />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="text-blue-600 font-medium hover:underline">
            Forgot Password?
          </button>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold mt-4">
          Login
        </button>
      </form>
       
     
    </div>
  );
}
