import React from "react";

const awards = [
  { title: "Pathways for HCPs, Clinics, Infusion Centers", description: "Organized and easy-to-understand approach to managing patient care." },
  { title: "Medisafe VIA", description: "Voice Intelligent Agent transforming how specialty brands activate, engage, and retain patients." },
];

const Awards = () => (
  <section className="bg-gray-100 py-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">Awards & Recognition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((award) => (
          <div key={award.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
            <p className="text-gray-700">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Awards;
