"use client";
import { useState } from "react";
import data from "../utility/data.json";
import teachers from "../utility/teacher.json";


export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = (arr) =>
    arr.filter((p) =>
      `${p.firstname ?? ""} ${p.lastname ?? ""} ${p.job} ${p.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

  const Card = ({ person, role }) => (
    <div className="border border-gray-200 rounded-xl m-4 p-4 shadow-sm bg-white hover:shadow-md transition">
      <span className={`text-white text-xs border p-1 rounded-lg ${role === "Student" ? "bg-green-600" : "bg-blue-800"}`}>
        {role}
      </span>

      <img
        src={person.image}
        alt={person.firstname}
        className="w-14 h-14 rounded-full object-cover mt-3 mb-2 border border-gray-200"
      />

      <h2 className="text-lg font-bold text-black">
        {person.firstname} {person.lastname ?? ""}
      </h2>

      <p className="text-black text-sm"><span className="font-semibold">Job:</span> {person.job}</p>
      <p className="text-black text-sm"><span className="font-semibold">Age:</span> {person.age}</p>
      <p className="text-black text-sm"><span className="font-semibold">Height:</span> {person.height} cm</p>
      <p className="text-black text-sm"><span className="font-semibold">Email:</span> {person.email}</p>

      <p className="font-semibold text-sm mt-2 text-black">Items:</p>
      <ul className="text-black text-sm space-y-1">
        {person.items.map((item) => (
          <li key={item.id}>
            {item.name}
            <img
              src={item.url}
              alt={item.name}
              className="w-10 h-10 rounded mt-1 object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const Divider = ({ label, color }) => (
    <div className="flex items-center my-6 mx-4">
      <hr className={`flex-1 border-t-2 border-${color}-500`} />
      <span className={`mx-4 text-${color}-500 font-semibold`}>{label}</span>
      <hr className={`flex-1 border-t-2 border-${color}-500`} />
    </div>
  );

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-black"
      />

      <Divider label="Students" color="green" />
      <div className="grid grid-cols-6">
        {filtered(data).map((person) => (
          <Card key={person.id} person={person} role="Student" />
        ))}
      </div>
      {filtered(data).length === 0 && (
        <p className="text-center text-gray-400 font-semibold my-4">NOT FOUND</p>
      )}

      <Divider label="Teachers" color="pink" />
      <div className="grid grid-cols-6">
        {filtered(teachers).map((teacher) => (
          <Card key={teacher.id} person={teacher} role="Teacher" />
        ))}
      </div>
      {filtered(teachers).length === 0 && (
        <p className="text-center text-gray-400 font-semibold my-4">NOT FOUND</p>
      )}
    </div>
  );
}