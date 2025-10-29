// import React from "react";
// import "./dashboard.css";

// const roleData = {
//   admin: {
//     title: "Admin Dashboard",
//     stats: [
//       { name: "Total Patients", value: 5000, color: "green" },
//       { name: "Doctors", value: 120, color: "blue" },
//       { name: "Caregivers", value: 80, color: "orange" },
//       { name: "Appointments Today", value: 45, color: "purple" },
//     ],
//   },
//   doctor: {
//     title: "Doctor Dashboard",
//     stats: [
//       { name: "My Patients", value: 45, color: "green" },
//       { name: "Appointments Today", value: 10, color: "blue" },
//       { name: "Lab Tests Pending", value: 5, color: "orange" },
//       { name: "Messages", value: 12, color: "purple" },
//     ],
//   },
//   patient: {
//     title: "Patient Dashboard",
//     stats: [
//       { name: "My Medications", value: 8, color: "green" },
//       { name: "Upcoming Appointments", value: 2, color: "blue" },
//       { name: "Messages", value: 3, color: "orange" },
//       { name: "Health Tips", value: 5, color: "purple" },
//     ],
//   },
//   caregiver: {
//     title: "Caregiver Dashboard",
//     stats: [
//       { name: "Patients I Care For", value: 3, color: "green" },
//       { name: "Upcoming Appointments", value: 4, color: "blue" },
//       { name: "Messages", value: 2, color: "orange" },
//       { name: "Tasks Today", value: 6, color: "purple" },
//     ],
//   },
// };

// const Dashboard = ({ role }) => {
//   const data = roleData[role];

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">{data.title}</h1>
//       <div className="dashboard-grid">
//         {data.stats.map((stat) => (
//           <div
//             key={stat.name}
//             className={`dashboard-card dashboard-card-${stat.color}`}
//           >
//             <p className="stat-name">{stat.name}</p>
//             <p className="stat-value">{stat.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
