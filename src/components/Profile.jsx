import React, { useEffect, useState } from "react";
import "./Profile.css";

const emptyMedication = () => ({ name: "", dosage: "", frequency: "" });

const Profile = () => {
  // step management
  const [step, setStep] = useState(0);

  // profile state
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    diseases: [""],
    medications: [emptyMedication()],
    allergies: [""],
    emergencyContact: { name: "", phone: "" },
  });

  const [saving, setSaving] = useState(false);
  const steps = ["Personal", "Conditions", "Medications", "Emergency"];

  // load saved mock data (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("chronicare_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const updateField = (field, value) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const updateArrayField = (field, idx, value) => {
    setProfile((p) => {
      const arr = [...p[field]];
      arr[idx] = value;
      return { ...p, [field]: arr };
    });
  };

  const addToArray = (field, item = "") =>
    setProfile((p) => ({ ...p, [field]: [...p[field], item] }));

  const removeFromArray = (field, idx) =>
    setProfile((p) => {
      const arr = p[field].filter((_, i) => i !== idx);
      return { ...p, [field]: arr.length ? arr : ["" ] };
    });

  const updateMedication = (idx, key, value) =>
    setProfile((p) => {
      const meds = [...p.medications];
      meds[idx] = { ...meds[idx], [key]: value };
      return { ...p, medications: meds };
    });

  // navigation
  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else handleSave(); // last step -> save
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // mock save -> localStorage (replace with axios PUT/POST later)
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem("chronicare_profile", JSON.stringify(profile));
      setSaving(false);
      // simple success animation/toast:
      const toast = document.createElement("div");
      toast.innerText = "Profile saved successfully!";
      toast.className = "profile-toast";
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 10);
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2200);
    }, 700);
  };

  // small validation example (you can expand)
  const canProceed = () => {
    if (step === 0) return profile.name.trim().length > 0 && profile.age;
    return true;
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Continue filling your profile</h1>
          <p className="muted">Tell us more so we can personalize your care</p>

          <div className="progress-wrap">
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="progress-steps">
              {steps.map((s, i) => (
                <div key={s} className={`dot ${i <= step ? "active" : ""}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-form-area">
          {/* Step panels */}
          <div className={`panel ${step === 0 ? "enter" : "exit-left"}`}>
            <h2>Personal information</h2>
            <div className="grid">
              <input
                placeholder="Full name"
                value={profile.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                placeholder="Age"
                type="number"
                value={profile.age}
                onChange={(e) => updateField("age", e.target.value)}
              />
              <select
                value={profile.gender}
                onChange={(e) => updateField("gender", e.target.value)}
              >
                <option value="">Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <input
                placeholder="Weight (kg)"
                type="number"
                value={profile.weight}
                onChange={(e) => updateField("weight", e.target.value)}
              />
              <input
                placeholder="Height (cm)"
                type="number"
                value={profile.height}
                onChange={(e) => updateField("height", e.target.value)}
              />
            </div>
          </div>

          <div className={`panel ${step === 1 ? "enter" : step < 1 ? "hidden" : "exit-left"}`}>
            <h2>Health conditions</h2>
            <p className="muted">List diagnoses or chronic conditions</p>
            <div className="vertical-list">
              {profile.diseases.map((d, i) => (
                <div className="row" key={i}>
                  <input
                    placeholder={`Condition ${i + 1}`}
                    value={d}
                    onChange={(e) => updateArrayField("diseases", i, e.target.value)}
                  />
                  <button className="icon-btn" onClick={() => removeFromArray("diseases", i)} type="button">✖</button>
                </div>
              ))}
            </div>
            <button type="button" className="ghost-btn" onClick={() => addToArray("diseases", "")}>
              + Add condition
            </button>
          </div>

          <div className={`panel ${step === 2 ? "enter" : step < 2 ? "hidden" : "exit-left"}`}>
            <h2>Medications</h2>
            <p className="muted">Add meds, doses, and how often you take them</p>
            <div className="vertical-list">
              {profile.medications.map((m, i) => (
                <div className="med-row" key={i}>
                  <input
                    placeholder="Medication name"
                    value={m.name}
                    onChange={(e) => updateMedication(i, "name", e.target.value)}
                  />
                  <input
                    placeholder="Dosage (e.g., 50 mg)"
                    value={m.dosage}
                    onChange={(e) => updateMedication(i, "dosage", e.target.value)}
                  />
                  <input
                    placeholder="Frequency (e.g., once/day)"
                    value={m.frequency}
                    onChange={(e) => updateMedication(i, "frequency", e.target.value)}
                  />
                  <button className="icon-btn" onClick={() => {
                    setProfile(p => ({ ...p, medications: p.medications.filter((_, idx)=> idx !== i) || [emptyMedication()] }));
                  }} type="button">✖</button>
                </div>
              ))}
            </div>
            <div className="med-actions">
              <button className="ghost-btn" onClick={() => setProfile(p => ({ ...p, medications: [...p.medications, emptyMedication()] }))} type="button">
                + Add medication
              </button>

              <h3 className="sub">Allergies</h3>
              <div className="vertical-list">
                {profile.allergies.map((a, i) => (
                  <div className="row" key={i}>
                    <input placeholder={`Allergy ${i + 1}`} value={a} onChange={(e) => updateArrayField("allergies", i, e.target.value)} />
                    <button className="icon-btn" onClick={() => removeFromArray("allergies", i)} type="button">✖</button>
                  </div>
                ))}
              </div>
              <button className="ghost-btn" onClick={() => addToArray("allergies", "")} type="button">
                + Add allergy
              </button>
            </div>
          </div>

          <div className={`panel ${step === 3 ? "enter" : step < 3 ? "hidden" : "exit-left"}`}>
            <h2>Emergency contact</h2>
            <div className="grid">
              <input
                placeholder="Contact name"
                value={profile.emergencyContact.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, emergencyContact: { ...p.emergencyContact, name: e.target.value } }))
                }
              />
              <input
                placeholder="Phone number"
                value={profile.emergencyContact.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, emergencyContact: { ...p.emergencyContact, phone: e.target.value } }))
                }
              />
            </div>

            <div className="summary">
              <h3>Summary (preview)</h3>
              <pre className="summary-box">{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button className="back-btn" onClick={back} disabled={step === 0}>
            ← Back
          </button>

          <div className="actions">
            {step < steps.length - 1 && (
              <button className={`next-btn ${!canProceed() ? "disabled" : ""}`} onClick={next} disabled={!canProceed()}>
                Next →
              </button>
            )}
            {step === steps.length - 1 && (
              <button className="save-btn" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
