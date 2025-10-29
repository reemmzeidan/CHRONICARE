import React from "react";

const links = [
  { name: "Our Story", href: "#" },
  { name: "Mission & Vision", href: "#" },
  { name: "Our Team", href: "#" },
];

const stats = [
  { name: "Patients served", value: "5,000+" },
  { name: "Healthcare professionals", value: "120+" },
  { name: "Years of experience", value: "10" },
  { name: "Locations", value: "3" },
];

const About = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            About Chronicare
          </h2>
          <p className="mt-8 text-lg text-gray-300 sm:text-xl/8">
            Chronicare is dedicated to providing quality healthcare services for patients of all ages.
            Our platform connects patients, caregivers, and doctors to make healthcare more accessible
            and efficient.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-blue-400">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
export default About;