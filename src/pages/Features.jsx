import React from "react";

const features = [
  { title: "Omnichannel", description: "Download App • See Our Technology • Get Real-World Data • View Our Solutions" },
  { title: "Behavioral AI", description: "Revolutionizes patient engagement with advanced technology to meet patient needs." },
  { title: "Validated", description: "Chronicare delivers proven guidance to increase adherence and extend persistence." },
  { title: "Personalized", description: "Patient-centric approach at the center of everything we do." },
];

const Features = () => (
  <section id="features" className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
