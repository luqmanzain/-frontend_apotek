import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import "./profile.css"; // Gunakan file CSS milikmu

const EditProfile = () => {
  const [name, setName] = useState("John Doe");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Semua kolom password wajib diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    // Simulasi update
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Profil berhasil diperbarui!");
    }, 2000);
  };

  return (
    <Sidebar titlePage="Edit Profile">
      <div className="edit-profile-container container">
        <h2 className="title text-center">Edit Profile</h2>

        {/* Edit Nama */}
        <div className="form-group">
          <label>Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password Lama */}
        <div className="form-group">
          <label>Password Lama</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/* Password Baru */}
        <div className="form-group">
          <label>Password Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Konfirmasi Password */}
        <div className="form-group">
          <label>Konfirmasi Password Baru</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Tombol */}
        <div className="btn-container">
          <Link to="/dashboard" className="btn btn-secondary">Batal</Link>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default EditProfile;
