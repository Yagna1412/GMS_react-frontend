import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/profile"; // Update if backend port changes

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const getProfile = (id) => api.get(`/${id}`);

const updateProfile = (id, data) => api.put(`/${id}`, data);

const changePassword = ({ id, oldPassword, newPassword }) =>
  api.put(`/change-password/${id}`, { oldPassword, newPassword });

const toggleTwoFactor = (enabled) =>
  api.put("/two-factor", null, { params: { enabled } });

const uploadProfileImage = (formData) =>
  api.post("/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userId = 1; // Assuming user ID is 1, replace with actual user ID from auth
        const response = await getProfile(userId);
        const data = response.data;
        console.log("Profile data received:", data);
        setFormData({
          id: data.id || userId,
          username: data.username || "",
          email: data.email || "",
          mobile: String(data.mobile || ""),
          address: data.address || "",
        });
        if (data.profileImagePath) setProfileImage(data.profileImagePath);
        if (data.twoFactorEnabled !== undefined) setTwoFactor(data.twoFactorEnabled);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Upload profile image
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(URL.createObjectURL(file));

    const formDataImg = new FormData();
    formDataImg.append("file", file);

    try {
      const res = await uploadProfileImage(formDataImg);
      if (res.status !== 200 && res.status !== 201) throw new Error("Upload failed");
      alert("Image uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Image upload ❌");
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        mobile: Number(formData.mobile) || 0,
        address: formData.address,
      };
      const res = await updateProfile(formData.id, updateData);
      if (res.status !== 200 && res.status !== 204) throw new Error("Update failed");
      const data = res.data;
      setFormData({
        id: data.id,
        username: data.username || "",
        email: data.email || "",
        mobile: String(data.mobile || ""),
        address: data.address || "",
      });
      setIsEditing(false);
      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  // Password handlers
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const submitPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await changePassword({
        id: formData.id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      if (res.status !== 200 && res.status !== 204) throw new Error("Password change failed");
      alert("Password updated ✅");
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      alert("Password change ❌");
    }
  };

  // Toggle Two-Factor
  const handleToggleTwoFactor = async () => {
    try {
      const res = await toggleTwoFactor(!twoFactor);
      if (res.status !== 200 && res.status !== 204) throw new Error("Toggle failed");
      setTwoFactor(!twoFactor);
      alert(`Two-Factor ${!twoFactor ? "Enabled ✅" : "Disabled ❌"}`);
    } catch (err) {
      console.error(err);
      alert("Toggle failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={profileImage}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover"
          />
          {isEditing && (
            <label className="mt-3 px-4 py-2 bg-blue-100 text-blue-600 rounded cursor-pointer hover:bg-blue-200 transition">
              Change Photo
              <input type="file" className="hidden" onChange={handlePhotoChange} />
            </label>
          )}
        </div>

        {/* Personal Info */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {["username", "email", "mobile", "address"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={!isEditing}
              className="p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
        </div>

        {/* Security */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div
            onClick={() => setShowPasswordModal(true)}
            className="cursor-pointer p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            Change Password
          </div>

          <div className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-gray-500 text-sm">{twoFactor ? "Enabled" : "Disabled"}</p>
            </div>
            <button
              onClick={handleToggleTwoFactor}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                twoFactor ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full transform transition ${
                  twoFactor ? "translate-x-7" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
              <input
                key={field}
                type="password"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                onChange={handlePasswordChange}
                className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;