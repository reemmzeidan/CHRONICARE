import React from "react";

const insights = [
  { title: "AI in Pharma", description: "Artificial intelligence is transforming patient engagement and healthcare delivery." },
  { title: "Patient Journey Management", description: "Optimizing adherence and persistence with personalized interventions." },
];

const Insights = () => (
  <section id="insights" className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.map((insight) => (
          <div key={insight.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
            <p className="text-gray-700">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Insights;
