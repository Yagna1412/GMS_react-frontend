// src/services/feedbackApi.js
// ─────────────────────────────────────────────────────────
// All API calls for the Feedback page
// Backend runs on: http://localhost:8080
// ─────────────────────────────────────────────────────────

import axios from "axios";

const BASE_URL = "http://localhost:8080";

// ─────────────────────────────────────────────────────────
// REVIEWS APIs
// ─────────────────────────────────────────────────────────

// GET /api/reviews?customerId=1
export const getReviews = async (customerId) => {
  const response = await axios.get(`${BASE_URL}/api/reviews`, {
    params: { customerId },
  });
  return response.data;
};

// POST /api/reviews
export const submitReview = async (reviewData) => {
  const response = await axios.post(`${BASE_URL}/api/reviews`, reviewData);
  return response.data;
};

// ─────────────────────────────────────────────────────────
// TICKETS APIs
// ─────────────────────────────────────────────────────────

// GET /api/tickets?customerId=1
export const getTickets = async (customerId) => {
  const response = await axios.get(`${BASE_URL}/api/tickets`, {
    params: { customerId },
  });
  return response.data;
};

// GET /api/tickets/{id}
export const getTicketById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/tickets/${id}`);
  return response.data;
};

// POST /api/tickets
export const createTicket = async (ticketData) => {
  const response = await axios.post(`${BASE_URL}/api/tickets`, ticketData);
  return response.data;
};

// PUT /api/tickets/{id}
export const updateTicket = async (id, ticketData) => {
  const response = await axios.put(`${BASE_URL}/api/tickets/${id}`, ticketData);
  return response.data;
};

// DELETE /api/tickets/{id}
export const deleteTicket = async (id) => {
  await axios.delete(`${BASE_URL}/api/tickets/${id}`);
};