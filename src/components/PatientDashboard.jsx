import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./PatientDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function PatientDashboard() {
  const [tab, setTab] = useState("Profile");
  const [loading, setLoading] = useState(false);

 
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    emergencyContact: { name: "", phone: "" },
  });

  
  const [symptoms, setSymptoms] = useState([]);
  const [symptomText, setSymptomText] = useState("");
  const [readings, setReadings] = useState([]);
  const [readingValue, setReadingValue] = useState("");

 
  const [medications, setMedications] = useState([]);
  const [medForm, setMedForm] = useState({ name: "", dosage: "", frequency: "" });

 
  useEffect(() => {
    if (tab === "Profile") loadProfile();
    if (tab === "Symptoms" || tab === "Readings") loadTracking();
    if (tab === "Medications") loadMedications();
  }, [tab]);

  
  async function loadProfile() {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await api.get(`/patients/user/${userId}/profile`);
      const data = res.data.data || res.data;
      setProfile(data);
      setForm({
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        weight: data.weight || "",
        height: data.height || "",
        emergencyContact: data.emergencyContact || { name: "", phone: "" },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally { setLoading(false); }
  }

  async function loadTracking() {
    try {
      setLoading(true);
      const res = await api.get("/tracking"); 
      const all = res.data.data || res.data || [];
      setSymptoms(all.filter(r => r.type === "symptom"));
      setReadings(all.filter(r => r.type === "bloodSugar"));
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally { setLoading(false); }
  }

  async function loadMedications() {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await api.get(`/medications/user/${userId}`);
      setMedications(res.data.data || res.data || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally { setLoading(false); }
  }

 
  async function saveProfile() {
    try {
      const payload = { ...form };
      await api.patch(`/patients/user/${localStorage.getItem("userId")}/profile`, payload);
      setEditMode(false);
      loadProfile();
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save profile");
    }
  }

  async function addSymptom() {
    if (!symptomText) return;
    try {
      const payload = { type: "symptom", symptom: symptomText, date: new Date() };
      await api.post("/tracking", payload);
      setSymptoms(prev => [payload, ...prev]);
      setSymptomText("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add symptom");
    }
  }

  async function addReading() {
    if (!readingValue) return;
    try {
      const payload = { type: "bloodSugar", value: Number(readingValue), date: new Date() };
      await api.post("/tracking", payload);
      setReadings(prev => [payload, ...prev]);
      setReadingValue("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add reading");
    }
  }

  async function addMedication() {
    if (!medForm.name) return alert("Enter medication name");
    try {
      const payload = { ...medForm };
      await api.post("/medications", payload);
      setMedications(prev => [payload, ...prev]);
      setMedForm({ name: "", dosage: "", frequency: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add medication");
    }
  }

  async function sendEmergency() {
    try {
      await api.post("/alerts", { message: "Emergency: immediate assistance needed" });
      alert("Emergency sent to your doctor and caregiver");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to send emergency");
    }
  }

  const chartLabels = readings.map(r => new Date(r.date).toLocaleDateString());
  const chartValues = readings.map(r => r.value);

  const barData = {
    labels: chartLabels,
    datasets: [{ label: "Blood Sugar", data: chartValues, backgroundColor: "rgba(29,144,245,0.8)" }]
  };

  const pieData = {
    labels: ["Normal", "High", "Low"],
    datasets: [{
      data: [
        readings.filter(r => r.value >= 70 && r.value <= 140).length,
        readings.filter(r => r.value > 140).length,
        readings.filter(r => r.value < 70).length
      ],
      backgroundColor: ["#16a34a", "#f59e0b", "#ef4444"]
    }]
  };

  
  return (
    <div className="patient-container">
      <div className="patient-header">
        <h1>Patient Dashboard</h1>
        <div className="tabs">
          {["Profile", "Symptoms", "Medications", "Readings", "Emergency"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab===t? "active":""}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="patient-body">
        {loading && <div className="loading">Loading...</div>}

        
        {tab === "Profile" && (
          <div className="card profile-card">
            {!editMode ? (
              <div>
                <h2>Profile</h2>
                <div><strong>Name:</strong> {profile?.name}</div>
                <div><strong>Age:</strong> {profile?.age}</div>
                <div><strong>Gender:</strong> {profile?.gender}</div>
                <div><strong>Weight:</strong> {profile?.weight || "-"}</div>
                <div><strong>Height:</strong> {profile?.height || "-"}</div>
                <div><strong>Emergency:</strong> {profile?.emergencyContact?.name || "-"} {profile?.emergencyContact?.phone || ""}</div>
                <button onClick={() => setEditMode(true)} className="btn">Edit</button>
              </div>
            ) : (
              <div>
                <h2>Edit Profile</h2>
                <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Name" />
                <input value={form.age} onChange={e => setForm({...form, age:e.target.value})} placeholder="Age" />
                <input value={form.gender} onChange={e => setForm({...form, gender:e.target.value})} placeholder="Gender" />
                <input value={form.weight} onChange={e => setForm({...form, weight:e.target.value})} placeholder="Weight" />
                <input value={form.height} onChange={e => setForm({...form, height:e.target.value})} placeholder="Height" />
                <input value={form.emergencyContact.name} onChange={e => setForm({...form, emergencyContact:{...form.emergencyContact, name:e.target.value}})} placeholder="Emergency name" />
                <input value={form.emergencyContact.phone} onChange={e => setForm({...form, emergencyContact:{...form.emergencyContact, phone:e.target.value}})} placeholder="Emergency phone" />
                <div className="actions">
                  <button onClick={saveProfile} className="btn primary">Save</button>
                  <button onClick={() => setEditMode(false)} className="btn">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

       
        {tab === "Symptoms" && (
          <div className="card">
            <h2>Symptom Tracker</h2>
            <textarea value={symptomText} onChange={e=>setSymptomText(e.target.value)} placeholder="Describe symptom..." />
            <button onClick={addSymptom} className="btn primary">Add Symptom</button>
            <div className="list">
              {symptoms.length ? symptoms.map((s,i) => <div key={i} className="list-item">{s.symptom || s.note}</div>) : <div className="muted">No symptoms yet</div>}
            </div>
          </div>
        )}

        
        {tab === "Medications" && (
          <div className="card">
            <h2>Medications</h2>
            <input placeholder="Name" value={medForm.name} onChange={e=>setMedForm({...medForm, name:e.target.value})} />
            <input placeholder="Dosage" value={medForm.dosage} onChange={e=>setMedForm({...medForm, dosage:e.target.value})} />
            <input placeholder="Frequency" value={medForm.frequency} onChange={e=>setMedForm({...medForm, frequency:e.target.value})} />
            <button onClick={addMedication} className="btn primary">Add Medication</button>
            <div className="list">
              {medications.length ? medications.map((m,i) => <div key={i} className="list-item">{m.name} — {m.dosage} — {m.frequency}</div>) : <div className="muted">No medications</div>}
            </div>
          </div>
        )}

        {tab === "Readings" && (
          <div className="card">
            <h2>Daily Readings</h2>
            <div className="reading-row">
              <input type="number" placeholder="Blood sugar" value={readingValue} onChange={e=>setReadingValue(e.target.value)} />
              <button onClick={addReading} className="btn primary">Add Reading</button>
            </div>
            <div className="charts">
              <div className="chart-box"><Bar data={barData} /></div>
              <div className="chart-box small"><Pie data={pieData} /></div>
            </div>
            <div className="list mt-4">
              {readings.length ? readings.map((r,i)=> <div key={i} className="list-item">{new Date(r.date).toLocaleString()} — {r.value}</div>) : <div className="muted">No readings yet</div>}
            </div>
          </div>
        )}

       
        {tab === "Emergency" && (
          <div className="card emergency-card">
            <h2>Emergency</h2>
            <p>Press the button below to alert your doctor and caregiver.</p>
            <button onClick={sendEmergency} className="btn danger">Send Emergency Alert</button>
          </div>
        )}
      </div>
    </div>
  );
}
