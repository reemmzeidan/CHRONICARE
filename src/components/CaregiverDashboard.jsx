import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CaregiverDashboard.css";

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function CaregiverDashboard() {
  const [tab, setTab] = useState("Profile");
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    assignedPatient: null,
  });

  const [allPatients, setAllPatients] = useState([]);
  const [patientIdToAssign, setPatientIdToAssign] = useState("");

  useEffect(() => {
    if (tab === "Profile") loadProfile();
    if (tab === "Assignment") loadAllPatients();
  }, [tab]);

  async function loadProfile() {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await api.get(`/caregivers/user/${userId}`);
      const data = res.data.data || res.data;
      setProfile(data);
      setForm({
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        assignedPatient: data.patient || null,
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
      await api.patch(`/caregivers/${userId}`, form);
      setEditMode(false);
      loadProfile();
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save profile");
    }
  }

  async function assignPatient() {
    if (!patientIdToAssign) return alert("Select a patient to assign");
    try {
      await api.post("/caregivers/assign", {
        caregiverId: profile._id,
        patientId: patientIdToAssign,
      });
      alert("Patient assigned successfully");
      loadProfile();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to assign patient");
    }
  }

  return (
    <div className="caregiver-container">
      <div className="caregiver-header">
        <h1>Caregiver Dashboard</h1>
        <div className="tabs">
          {["Profile", "Assignment"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab===t? "active":""}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="caregiver-body">
        {loading && <div className="loading">Loading...</div>}

        {tab === "Profile" && profile && (
          <div className="card profile-card">
            {!editMode ? (
              <div>
                <h2>Profile</h2>
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Age:</strong> {profile.age}</div>
                <div><strong>Gender:</strong> {profile.gender}</div>
                <div><strong>Assigned Patient:</strong> {profile.patient?.name || "-"}</div>
                <button onClick={() => setEditMode(true)} className="btn">Edit</button>
              </div>
            ) : (
              <div>
                <h2>Edit Profile</h2>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
                <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" />
                <input value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} placeholder="Gender" />
                <div className="actions">
                  <button onClick={saveProfile} className="btn primary">Save</button>
                  <button onClick={() => setEditMode(false)} className="btn">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "Assignment" && (
          <div className="card">
            <h2>Assign Patient</h2>
            <select value={patientIdToAssign} onChange={e => setPatientIdToAssign(e.target.value)}>
              <option value="">Select Patient</option>
              {allPatients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <button onClick={assignPatient} className="btn primary">Assign</button>
            <div className="current-assignment mt-4">
              <h3>Current Assigned Patient</h3>
              {profile?.patient ? (
                <div className="list-item">{profile.patient.name}</div>
              ) : (
                <div className="muted">No patient assigned yet</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
