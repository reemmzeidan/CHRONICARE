import React from "react";

const testimonials = [
  { name: "Jessica", role: "Medisafer since 2015", text: "I had a seizure and woke up with aphasia. Chronicare helped me track my medications and regain control." },
  { name: "Makeba and Son", role: "PDURS-Ready in 2025", text: "Chronicare is ready to catch up on upcoming healthcare guidelines." },
];

const Testimonials = () => (
  <section className="bg-blue-50 py-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <p className="text-gray-700 mb-4">"{t.text}"</p>
            <h4 className="font-semibold">{t.name}</h4>
            <span className="text-gray-500 text-sm">{t.role}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
