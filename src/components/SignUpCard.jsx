import React from "react";

export default function SignUpCard({ goToLogin }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

      <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

      <form className="space-y-4">

        <div>
          <label className="text-sm block mb-1 font-medium">Full Name</label>
          <input className="input" placeholder="John Doe" />
        </div>

        <div>
          <label className="text-sm block mb-1 font-medium">Email Address</label>
          <input className="input" placeholder="john@example.com" />
        </div>

        <div>
          <label className="text-sm block mb-1 font-medium">Username</label>
          <input className="input" placeholder="johndoe" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1 font-medium">Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>

          <div>
            <label className="text-sm block mb-1 font-medium">Confirm Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1 font-medium">Role</label>
          <select className="input">
            <option>Select your role</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Inventory Manager</option>
            <option>HR Manager</option>
            <option>Service Advisor</option>
            <option>Mechanic</option>
          </select>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3 text-sm mt-2">
          <input type="checkbox" className="mt-1" />
          <p className="text-gray-600 leading-5">
            I agree to the{" "}
            <span className="text-black-400 underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-black-400 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold mt-4">
          Create Account
        </button>

      </form>
      </div>
      
  );
}
