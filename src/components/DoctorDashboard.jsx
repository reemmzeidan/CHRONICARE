import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorDashboard.css";

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function DoctorDashboard() {
  const [tab, setTab] = useState("Profile");
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    age: "",
    gender: "",
    patients: [],
  });

  const [allPatients, setAllPatients] = useState([]);
  const [linkPatientId, setLinkPatientId] = useState("");

  useEffect(() => {
    if (tab === "Profile") loadProfile();
    if (tab === "Patients") loadAllPatients();
  }, [tab]);

  async function loadProfile() {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await api.get(`/doctors/user/${userId}`);
      const data = res.data.data || res.data;
      setProfile(data);
      setForm({
        name: data.name || "",
        specialization: data.specialization || "",
        age: data.age || "",
        gender: data.gender || "",
        patients: data.patients || [],
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally { setLoading(false); }
  }

  async function loadAllPatients() {
    try {
      setLoading(true);
      const res = await api.get("/patients");
      setAllPatients(res.data.data || res.data || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally { setLoading(false); }
  }

  async function saveProfile() {
    try {
      const userId = localStorage.getItem("userId");
      await api.patch(`/doctors/${userId}`, { specialization: form.specialization });
      setEditMode(false);
      loadProfile();
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save profile");
    }
  }

  async function linkPatient() {
    if (!linkPatientId) return alert("Select a patient to link");
    try {
      await api.post(`/doctors/${profile._id}/link/${linkPatientId}`);
      alert("Patient linked successfully");
      loadProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to link patient");
    }
  }

  async function unlinkPatient(patientId) {
    try {
      await api.post(`/doctors/${profile._id}/unlink/${patientId}`);
      alert("Patient unlinked successfully");
      loadProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to unlink patient");
    }
  }

  return (
    <div className="doctor-container">
      <div className="doctor-header">
        <h1>Doctor Dashboard</h1>
        <div className="tabs">
          {["Profile", "Patients"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab===t? "active":""}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="doctor-body">
        {loading && <div className="loading">Loading...</div>}

        {tab === "Profile" && profile && (
          <div className="card profile-card">
            {!editMode ? (
              <div>
                <h2>Profile</h2>
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Age:</strong> {profile.age}</div>
                <div><strong>Gender:</strong> {profile.gender}</div>
                <div><strong>Specialization:</strong> {profile.specialization}</div>
                <button onClick={() => setEditMode(true)} className="btn">Edit</button>
              </div>
            ) : (
              <div>
                <h2>Edit Profile</h2>
                <input
                  value={form.specialization}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}
                  placeholder="Specialization"
                />
                <div className="actions">
                  <button onClick={saveProfile} className="btn primary">Save</button>
                  <button onClick={() => setEditMode(false)} className="btn">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "Patients" && (
          <div className="card">
            <h2>My Patients</h2>

            <div className="link-patient">
              <select value={linkPatientId} onChange={e => setLinkPatientId(e.target.value)}>
                <option value="">Select patient to link</option>
                {allPatients.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
              <button onClick={linkPatient} className="btn primary">Link Patient</button>
            </div>

            <div className="patient-list">
              {form.patients.length ? form.patients.map(p => (
                <div key={p._id} className="list-item">
                  {p.name} 
                  <button onClick={() => unlinkPatient(p._id)} className="btn danger small">Unlink</button>
                </div>
              )) : <div className="muted">No patients linked</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
