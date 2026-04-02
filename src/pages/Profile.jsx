import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );

  const [formData, setFormData] = useState({
    username: "ADMIN",
    email: "alex@example.com",
    mobile: "+91 9999999999",
    address: "Manthatech",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile Saved:", formData);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const submitPassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password Updated", passwordData);
    setShowPasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">My Profile</h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-md"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-10">

          <img
            src={profileImage}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover"
          />

          {isEditing && (
            <label className="text-blue-600 mt-3 cursor-pointer">
              Change Photo
              <input
                type="file"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>

        {/* Personal Info */}
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div>
            <label className="text-sm text-gray-600">User Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-3 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-3 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-3 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-3 border rounded-md bg-gray-50"
            />
          </div>

        </div>

        {/* Security Settings */}
        <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

        <div className="space-y-4">

          {/* Change Password */}
          <div
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="bg-gray-100 p-3 rounded-md text-xl">🔑</div>
            <div>
              <p className="font-semibold">Change Password</p>
              <p className="text-gray-500 text-sm">
                Click to update password
              </p>
            </div>
          </div>

          {/* Two Factor */}
          <div className="flex justify-between items-center border rounded-lg p-4">

            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-gray-500 text-sm">
                {twoFactor ? "Enabled" : "Disabled"}
              </p>
            </div>

            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                twoFactor ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  twoFactor ? "translate-x-6" : ""
                }`}
              ></div>
            </button>

          </div>

        </div>

      </div>

      {/* Change Password Modal */}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">Change Password</h2>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handlePasswordChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handlePasswordChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handlePasswordChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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

export default Profile;