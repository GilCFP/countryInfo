"use client"; // Necessário no App Router do Next.js

import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Link from "next/link";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    fetch("http://localhost:5500/countries/available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }
        console.log(res);
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {countries.length > 0 && <h2 className="text-center text-2xl pb-4">Countries List</h2>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pt-4 self-center">
      {countries.length > 0 ? (
        countries.map((country: any, index: number) => (
        <li key={index}>
          <Link className="hover:underline" href={`/countries/${country.countryCode}`}>{country.name}</Link>
        </li>
        ))
      ) : (
        <h2 className="flex items-center justify-center h-full">Loading...</h2>
      )}
      </div>
    </div>
  );
}