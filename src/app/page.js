"use client";
import { useState } from "react";
import data from "../utility/data.json";
import teachers from "../utility/teacher.json";

const DIVIDER_COLORS = {
  green: "#3B6D11",
  pink: "#993556",
};

const Divider = ({ label, color }) => {
  const c = DIVIDER_COLORS[color] || "#888";
  return (
    <div className="flex items-center my-6 mx-4">
      <hr style={{ flex: 1, borderTop: `2px solid ${c}` }} />
      <span style={{ color: c }} className="mx-4 font-semibold text-sm">
        {label}
      </span>
      <hr style={{ flex: 1, borderTop: `2px solid ${c}` }} />
    </div>
  );
};

const Card = ({ person, role }) => (
  <div className="border border-gray-200 rounded-xl m-2 p-4 shadow-sm bg-white hover:shadow-md transition">
    <span
      className={`text-white text-xs border p-1 rounded-lg ${
        role === "Student" ? "bg-green-600" : "bg-blue-800"
      }`}
    >
      {role}
    </span>

    <img
      src={person.image}
      alt={person.firstname}
      className="w-14 h-14 rounded-full object-cover mt-3 mb-2 border border-gray-200"
    />

    <h2 className="text-base font-bold text-black leading-tight">
      {person.firstname} {person.lastname ?? ""}
    </h2>

    <p className="text-black text-sm mt-1">
      <span className="font-semibold">Job:</span> {person.job}
    </p>
    <p className="text-black text-sm">
      <span className="font-semibold">Age:</span> {person.age}
    </p>
    <p className="text-black text-sm">
      <span className="font-semibold">Height:</span> {person.height} cm
    </p>
    <p className="text-black text-sm break-all">
      <span className="font-semibold">Email:</span> {person.email}
    </p>

    <p className="font-semibold text-sm mt-2 text-black">Items:</p>
    <ul className="text-black text-sm space-y-1">
      {person.items.map((item) => (
        <li key={item.id}>
          {item.name}
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/close-up-of-pomegranates-on-table-royalty-free-image-1701801291.jpg?crop=0.659xw:0.990xh;0.147xw,0&resize=1200:*"
            alt="Pomegranate"
            className="w-10 h-10 rounded mt-1 object-cover"
          />
          {item.url && (
            <img
              src={item.url}
              alt={item.name}
              className="w-10 h-10 rounded mt-1 object-cover"
            />
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = (arr) =>
    arr.filter((p) =>
      `${p.firstname ?? ""} ${p.lastname ?? ""} ${p.job} ${p.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

  const filteredStudents = filtered(data);
  const filteredTeachers = filtered(teachers);

  return (
    <div className="p-4 sm:p-6 bg-amber-50 min-h-screen">
      <input
        type="text"
        placeholder="Search by name, job or email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
      />

      <Divider label="Students" color="green" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredStudents.map((person) => (
          <Card key={person.id} person={person} role="Student" />
        ))}
      </div>
      {filteredStudents.length === 0 && (
        <p className="text-center text-gray-400 font-semibold my-4">
          NOT FOUND
        </p>
      )}

      <Divider label="Teachers" color="pink" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} person={teacher} role="Teacher" />
        ))}
      </div>
      {filteredTeachers.length === 0 && (
        <p className="text-center text-gray-400 font-semibold my-4">
          NOT FOUND
        </p>
      )}
    </div>
  );
}
