import React from "react";

const Hero = () => (
  <section id="home" className="bg-blue-600 text-white py-32 text-center">
    <p className="text-sm uppercase mb-4 font-semibold tracking-wide">
      NEWS: Chronicare launches new platform
    </p>
    <h1 className="text-5xl font-bold mb-6">Behavioral Science That Delivers</h1>
    <p className="text-lg mb-8 max-w-2xl mx-auto">
      Proven patient interventions and healthcare solutions designed to simplify care.
    </p>
    <div className="flex justify-center gap-4">
      <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
        Learn More
      </button>
      <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
        See The Demo
      </button>
    </div>
  </section>
);

export default Hero;
