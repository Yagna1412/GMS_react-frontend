import { useEffect, useState } from "react";
import { initialBranches } from '../data/branches';

export function useAddBranchModal({ open, data, mode = "add", onAdd, onUpdate, onClose }) {
  const [form, setForm] = useState({
    name: "",
    supervisor: "",
    location: "",
    employees: "",
    revenue: "",
    performance: "",
    status: "Active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        revenue: data.revenue.replace("₹", "").replace("L", ""),
      });
    } else {
      setForm({
        name: "",
        supervisor: "",
        location: "",
        employees: "",
        revenue: "",
        performance: "",
        status: "Active",
      });
    }
    setError("");
  }, [data, open]);

  const isView = mode === "view";
  const isEdit = mode === "edit";

  const handleChange = (e) => {
    if (isView) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.supervisor ||
      !form.location ||
      form.employees === "" ||
      form.revenue === "" ||
      form.performance === ""
    ) {
      setError("Please fill all the details");
      return;
    }
    const payload = {
      ...form,
      employees: Number(form.employees),
      performance: Number(form.performance),
      revenue: `₹${form.revenue}L`,
    };
    isEdit ? onUpdate(payload) : onAdd(payload);
    onClose();
  };

  return {
    form, setForm, error, setError, isView, isEdit, handleChange, handleSubmit
  };
}
