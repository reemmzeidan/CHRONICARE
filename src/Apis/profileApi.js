import axios from "axios";

// Backend base URL
const API_BASE = "http://localhost:3000"; 

// Get patient profile by userId
export const getProfile = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/patients/user/${userId}/profile`);
    return res.data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
};
