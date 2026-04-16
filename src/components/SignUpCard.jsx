

import React, { useState } from "react";
import * as yup from "yup";

export default function SignUpCard({ goToLogin }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: ""
  });
  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.string().notOneOf(["", "Select your role"], "Role is required")
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Account created successfully");
      goToLogin(); // switch to login screen
    } catch (validationError) {
      const newErrors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
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
          value={formData.name}
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

        <input
          name="email"
          placeholder="Email Address"
          className="input"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        <input
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
          value={formData.username}
        />
        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        <select
          name="role"
          className="input"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="">Select your role</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Admin">Admin</option>
          <option value="InventoryManager">InventoryManager</option>
          <option value="HRManager">HRManager</option>
          <option value="ServiceAdvisor">ServiceAdvisor</option>
          <option value="Mechanic">Mechanic</option>
        </select>
        {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold">
          Create Account
        </button>

      </form>
    </div>
  );
}