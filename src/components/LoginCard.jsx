
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard({ goToSignup }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    storedUser.username === username &&
    storedUser.password === password
  ) {

    if (storedUser.role === "SuperAdmin") {
      navigate("/super-admin");
    } 
    else if (storedUser.role === "Admin") {
      navigate("/admin");
    } 
     else if (storedUser.role === "Mechanic") {
      navigate("/mechanic");
    } 
    else {
      alert("Role not recognized");
    }

  } else {
    alert("Invalid Credentials");
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
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-3 bg-black text-white rounded-xl font-semibold">
          Login
        </button>

      </form>
    </div>
  );
}