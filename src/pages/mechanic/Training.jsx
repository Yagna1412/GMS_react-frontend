
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CheckCircle,
  Award,
  Clock,
  Download,
} from "lucide-react";

/* ---------------- SAMPLE DATA ---------------- */

const trainings = [
  {
    id: 1,
    name: "Advanced Engine Diagnostics",
    code: "TRN/001",
    progress: 60,
    due: "2024-12-31",
    status: "In Progress",
  },
  {
    id: 2,
    name: "EV Battery Safety",
    code: "TRN/002",
    progress: 100,
    due: "2024-11-15",
    status: "Completed",
  },
];

const certificates = [
  {
    id: 1,
    name: "ASE Master Technician",
    code: "CERT/001",
    issued: "2023-06-15",
    expiry: "2026-06-15",
    status: "active",
  },
  {
    id: 2,
    name: "Hybrid Vehicle Specialist",
    code: "CERT/002",
    issued: "2024-01-10",
    expiry: "2025-12-31",
    status: "expiring",
  },
];

/* ---------------- KPI CARD ---------------- */

const KpiCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center justify-between">

    <div>
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-1">
        {value}
      </h2>
    </div>

    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Icon className="text-blue-600" size={22} />
    </div>
  </div>
);

/* ---------------- TRAINING CARD ---------------- */

const TrainingCard = ({ training }) => {
  const navigate = useNavigate();

  const openTraining = () => {
    navigate(`/training/${training.id}`);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 space-y-3">

      {/* Header */}
      <div className="flex justify-between items-start gap-3">

        <h3 className="font-semibold text-base">
          {training.name}
        </h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            training.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {training.status}
        </span>
      </div>

      <p className="text-xs text-gray-500">
        {training.code}
      </p>

      {/* Progress */}
      <div>

        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{training.progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${training.progress}%`,
            }}
          />
        </div>

      </div>

      <p className="text-xs text-gray-500">
        Due: {training.due}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 text-sm text-blue-600 font-medium pt-2">

        {training.status === "Completed" ? (
          <>
            <button
              onClick={openTraining}
              className="hover:underline"
            >
              View Certificate
            </button>

            <button
              className="flex items-center gap-1 hover:underline"
            >
              <Download size={14} />
              Download
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openTraining}
              className="hover:underline"
            >
              Continue
            </button>

            <button
              onClick={openTraining}
              className="hover:underline"
            >
              Details
            </button>
          </>
        )}
      </div>

    </div>
  );
};

/* ---------------- CERTIFICATE CARD ---------------- */

const CertificateCard = ({ cert }) => (
  <div
    className={`rounded-xl border shadow-sm p-5 space-y-3 ${
      cert.status === "active"
        ? "bg-green-50 border-green-200"
        : "bg-orange-50 border-orange-200"
    }`}
  >
    <h3 className="font-semibold text-base">
      {cert.name}
    </h3>

    <p className="text-xs text-gray-500">
      {cert.code}
    </p>

    <div className="grid grid-cols-2 gap-3 text-sm">

      <div>
        <p className="text-gray-500 text-xs">
          Issued
        </p>

        <p className="font-medium">
          {cert.issued}
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-xs">
          Expiry
        </p>

        <p className="font-medium">
          {cert.expiry}
        </p>
      </div>

    </div>

    <span
      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
        cert.status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-orange-100 text-orange-700"
      }`}
    >
      {cert.status === "active"
        ? "Active"
        : "Expiring Soon"}
    </span>
  </div>
);

/* ---------------- MAIN ---------------- */

export default function Training() {
  const activeTrainings = trainings.filter(
    (t) => t.status === "In Progress"
  ).length;

  const completedTrainings = trainings.filter(
    (t) => t.status === "Completed"
  ).length;

  const totalCertificates = certificates.length;

  const expiringSoon = certificates.filter(
    (c) => c.status === "expiring"
  ).length;

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <KpiCard
          icon={GraduationCap}
          title="Active Trainings"
          value={activeTrainings}
        />

        <KpiCard
          icon={CheckCircle}
          title="Completed"
          value={completedTrainings}
        />

        <KpiCard
          icon={Award}
          title="Certificates"
          value={totalCertificates}
        />

        <KpiCard
          icon={Clock}
          title="Expiring Soon"
          value={expiringSoon}
        />

      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Trainings */}
        <div className="space-y-4">

          <h2 className="font-semibold text-lg">
            Assigned Trainings
          </h2>

          {trainings.length === 0 ? (
            <p className="text-sm text-gray-500">
              No trainings assigned
            </p>
          ) : (
            trainings.map((t) => (
              <TrainingCard
                key={t.id}
                training={t}
              />
            ))
          )}

        </div>

        {/* Certificates */}
        <div className="space-y-4">

          <h2 className="font-semibold text-lg">
            My Certifications
          </h2>

          {certificates.length === 0 ? (
            <p className="text-sm text-gray-500">
              No certificates found
            </p>
          ) : (
            certificates.map((c) => (
              <CertificateCard
                key={c.id}
                cert={c}
              />
            ))
          )}

        </div>

      </div>

    </div>
  );
}
