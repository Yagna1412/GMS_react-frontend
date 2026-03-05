import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo wrench.png";

export default function LeftPanel({ onLoginClick, onSignupClick, showLogin }) {
  return (
    <div className="max-w-xl">

      {/* Logo & Tagline */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-6" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Mantha Tech</h1>
          <p className="text-sky-400 text-sm">Drive Smart. Manage Smarter.</p>
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-6xl font-extrabold leading-tight">
        {showLogin ? (
          <>
            <span className="border-b-4 border-lime-400 pb-1 inline-block">
              POWERING
            </span>
            AROUND<br />
            THE WORLD.<br />
          </>
        ) : (
          <>
            CREATE YOUR <br />
            <span className="border-b-4 border-lime-400 pb-1 inline-block">
              GARAGEOS
            </span>
            ACCOUNT. <br />
          </>
        )}
      </h1>

      {/* Dynamic Link */}
      <div className="mt-10 text-gray-300">
        {showLogin ? (
          <>
            <p>Don’t have an account?</p>
            <button
              onClick={onSignupClick}
              className="underline mt-2 inline-block text-left text-white"
            >
              Create Account →
            </button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button
              onClick={onLoginClick}
              className="underline mt-2 inline-block text-left text-white"
            >
              Login →
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 flex items-center justify-between text-sm">
        <p className="text-white-400">© Mantha Tech 2025</p>

        <div className="flex items-center gap-6">
          <button
            className="text-white-400 hover:text-white transition"
            onClick={() => alert("Privacy Policy Coming Soon")}
          >
            Privacy Policy
          </button>

          <span className="text-white-400">·</span>

          {/* ✅ WORKING NAVIGATION */}
          <Link
            to="/contact-support"
            className="text-white-400 hover:text-white transition"
          >
            Contact Support
          </Link>
        </div>
      </div>

    </div>
  );
}
