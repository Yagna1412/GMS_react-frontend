import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import ContactSupport from "./pages/ContactSupport";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="/contact-support" element={<ContactSupport />} />
    </Routes>
  );
}
