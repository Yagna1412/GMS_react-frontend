import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import SignUpCard from "./SignUpCard";
import LoginCard from "./LoginCard";

export default function AuthLayout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="w-full h-full flex flex-col md:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center px-12 py-16">
        <LeftPanel
          showLogin={showLogin}
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowLogin(false)}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="relative w-full md:w-1/2 h-screen">
        
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/garage.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Card Holder */}
        <div className="relative flex justify-center items-start md:items-center h-full p-6">
          {showLogin ? (
            <LoginCard goToSignup={() => setShowLogin(false)} />
          ) : (
            <SignUpCard goToLogin={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
