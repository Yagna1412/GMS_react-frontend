import { useEffect, useMemo, useState } from "react";

const initialVehicles = [
  {
    id: "1",
    name: "Toyota Camry",
    year: 2020,
    fuel: "Hybrid",
    plate: "ABC-1234",
    lastService: "2025-10-15",
    nextDue: "2026-04-15",
    isPrimary: true,
  },
  {
    id: "2",
    name: "Honda CR-V",
    year: 2018,
    fuel: "Petrol",
    plate: "XYZ-9876",
    lastService: "2025-08-20",
    nextDue: "2026-02-20",
    isPrimary: false,
  },
];

function formatDate(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toISOString().slice(0, 10);
}

function VehicleCard({ vehicle, onDelete }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative flex h-40 w-full items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-900">{vehicle.name}</p>
          <p className="mt-1 text-sm text-slate-500">
            {vehicle.year} · {vehicle.fuel}
          </p>
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-3">
          <button
            onClick={() => onDelete(vehicle.id)}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
            Delete
          </button>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {vehicle.plate}
          </span>
        </div>
        {vehicle.isPrimary && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow">
            PRIMARY
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {vehicle.name}
          </h2>
          <p className="text-sm text-slate-500">
            {vehicle.year} · {vehicle.fuel}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Last service
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatDate(vehicle.lastService)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Next due
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatDate(vehicle.nextDue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddVehicleModal({ open, onClose, onSave }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [plate, setPlate] = useState("");
  const [fuel, setFuel] = useState("Petrol");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!brand.trim() || !model.trim() || !plate.trim()) return;

    const now = new Date();
    const lastService = now.toISOString().slice(0, 10);
    const nextDue = new Date(now.setMonth(now.getMonth() + 6))
      .toISOString()
      .slice(0, 10);

    onSave({
      id: `${Date.now()}`,
      name: `${brand.trim()} ${model.trim()}`,
      year: Number(year),
      fuel,
      plate: plate.trim().toUpperCase(),
      lastService,
      nextDue,
      isPrimary: false,
    });

    setBrand("");
    setModel("");
    setYear(new Date().getFullYear());
    setPlate("");
    setFuel("Petrol");
  };

  useEffect(() => {
    if (!open) {
      setBrand("");
      setModel("");
      setYear(new Date().getFullYear());
      setPlate("");
      setFuel("Petrol");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Add New Vehicle</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill out the details below to add a vehicle.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Brand
              </span>
              <input
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                placeholder="e.g. Toyota"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Model
              </span>
              <input
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="e.g. Camry"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Year
              </span>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Reg no.
              </span>
              <input
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                placeholder="ABC-1234"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Fuel type
            </span>
            <select
              value={fuel}
              onChange={(event) => setFuel(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Toast({ open, message, type = "success", onClose }) {
  if (!open) return null;

  const tone = type === "error" ? "bg-rose-600" : "bg-emerald-600";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex max-w-md items-center justify-between gap-4 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${tone}`}
      >
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const showToast = (message, type = "success") => {
    setToast({ open: true, message, type });
    window.setTimeout(() => {
      setToast((prev) => (prev.open ? { ...prev, open: false } : prev));
    }, 3000);
  };

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return vehicles;
    return vehicles.filter((vehicle) =>
      [vehicle.name, vehicle.plate, vehicle.fuel]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [vehicles, search]);

  const requestDelete = (id) => {
    setConfirm({ open: true, id });
  };

  const confirmDelete = () => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== confirm.id));
    setConfirm({ open: false, id: null });
    showToast("Vehicle deleted", "success");
  };

  const cancelDelete = () => {
    setConfirm({ open: false, id: null });
  };


  const handleAdd = (vehicle) => {
    setVehicles((prev) => [vehicle, ...prev]);
    setIsAddOpen(false);
    showToast("Vehicle saved successfully", "success");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">My Vehicles</h1>
            <p className="mt-1 text-sm text-slate-500">
              Keep track of your vehicles in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vehicles..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + Add Vehicle
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={requestDelete}
            />
          ))}

          {filteredVehicles.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No vehicles found.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try adjusting your search or add a new vehicle.
              </p>
            </div>
          )}
        </div>
      </main>

      <AddVehicleModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <ConfirmDialog
        open={confirm.open}
        title="Delete vehicle"
        message="Are you sure you want to delete this vehicle? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}