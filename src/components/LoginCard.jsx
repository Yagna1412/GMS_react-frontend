
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function LoginCard({ goToSignup }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({ username, password }, { abortEarly: false });
      setErrors({});
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
      ) {
        if (storedUser.role === "SuperAdmin") {
          navigate("/super-admin");
        } else if (storedUser.role === "Admin") {
          navigate("/admin");
        } else if (storedUser.role === "ServiceAdvisor") {
          navigate("/service-advisor");
        } else if (storedUser.role === "HRManager") {
          navigate("/hr");
        } else if (storedUser.role === "Mechanic") {
          navigate("/mechanic");
        } else if (storedUser.role === "InventoryManager") {
          navigate("/inventory-manager");
        } else {
          alert("Role not recognized");
        }
      } else {
        alert("Invalid Credentials");
      }
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
        Login to your account
      </h2>

      <form className="space-y-4" onSubmit={handleLogin}>

        <input
          className="input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold">
          Login
        </button>

      </form>
    </div>
  );
}