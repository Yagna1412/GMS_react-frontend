import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MonthlySpendingChart from "../../components/customer/reports/MonthlySpendingChart";
import AverageServiceCostChart from "../../components/customer/reports/AverageServiceCostChart";
import ServiceHistoryTable from "../../components/customer/reports/ServiceHistoryTable";
import ReportsHeader from "../../components/customer/reports/ReportsHeader";

// ── Axios instance ──────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:8080/api",  // ← added /api
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,           // ← return full response not res.data
  (err) => {
    console.error("API Error:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

// ── API calls ───────────────────────────────────────────────────────────────
const getServices         = (months) => api.get("/reports/service-history", { params: { months: months + 1 } });
const getMonthlySpendings = (months) => api.get("/reports/monthly-spending", { params: { months } });
const deleteService       = (id)     => api.delete(`/reports/service-history/${id}`);
const updateService       = (id, data) => api.put(`/reports/service-history/${id}`, data);
const updateRating        = (id, r)  => api.put(`/reports/service-history/${id}/rating`, null, { params: { rating: r } });
const getReceipt          = (id)     => api.get(`/reports/receipt/${id}`);

const Reports = () => {
  const [months, setMonths] = useState(6);
  const [services, setServices] = useState([]);
  const [spending, setSpending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // States for actions
  const [isDeleting, setIsDeleting] = useState({});
  const [isUpdating, setIsUpdating] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resServices, resSpending] = await Promise.all([
        getServices(months),
        getMonthlySpendings(months)
      ]);
      setServices(resServices.data || []);
      setSpending(resSpending.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [months]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    setIsDeleting(prev => ({ ...prev, [id]: true }));
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleUpdate = async (id, data) => {
    setIsUpdating(prev => ({ ...prev, [id]: true }));
    try {
      await updateService(id, data);
      await fetchData(); // Refresh data
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleRating = async (id, rating) => {
    setIsUpdating(prev => ({ ...prev, [id]: true }));
    try {
      await updateRating(id, rating);
      setServices(prev => prev.map(s => s.id === id ? { ...s, rating } : s));
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleViewReceipt = async (id) => {
    try {
      const res = await getReceipt(id);
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] p-10">
      <ReportsHeader months={months} setMonths={setMonths} />
      <div id="report-content">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <MonthlySpendingChart chartData={spending} />
          <AverageServiceCostChart services={services} />
        </div>
        <ServiceHistoryTable 
          services={services}
          loading={loading}
          error={error}
          onRetry={fetchData}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onRating={handleRating}
          onViewReceipt={handleViewReceipt}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
};

export default Reports;