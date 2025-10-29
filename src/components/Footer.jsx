import React from "react";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="font-semibold text-white mb-4">Chronicare</h4>
        <p>© Chronicare. All Rights Reserved.</p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-4">Contact</h4>
        <p>support@chronicare.com</p>
        <p>(888) 289-5236</p>
      </div>
      <div>
        <h4 className="font-semibold text-white mb-4">Download App</h4>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Google Play</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">App Store</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
