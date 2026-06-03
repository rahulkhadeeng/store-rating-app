import { useState } from "react";
import api from "../services/api";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/auth/change-password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Password change failed"
      );
    }
  };

  return (
    <div>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;