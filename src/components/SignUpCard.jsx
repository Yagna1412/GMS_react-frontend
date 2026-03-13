

import React, { useState } from "react";

export default function SignUpCard({ goToLogin }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));

    alert("Account created successfully");

    goToLogin(); // switch to login screen
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create your account
      </h2>

      <form className="space-y-4" onSubmit={handleSignup}>

        <input
          name="name"
          placeholder="Full Name"
          className="input"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          className="input"
          onChange={handleChange}
        />

        <input
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        <select
          name="role"
          className="input"
          onChange={handleChange}
        >
          <option>Select your role</option>
          <option>SuperAdmin</option>
          <option>Admin</option>
          <option>InventoryManager</option>
          <option>HRManager</option>
          <option>ServiceAdvisor</option>
          <option>Mechanic</option>
        </select>

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold">
          Create Account
        </button>

      </form>
    </div>
  );
}