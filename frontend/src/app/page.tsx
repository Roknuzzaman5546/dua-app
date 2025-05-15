'use client';
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from 'react';

type Dua = {
  id: number;
  dua_name_en: string;
  // other fields...
};

export default function Home() {
    const [duas, setDuas] = useState<Dua[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/all-duas')
      .then((res) => res.json())
      .then(setDuas);
  }, []);

  return (
    <div className=" flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">All Duas</h1>
          {duas.map((dua) => (
            <div key={dua.id} id={`dua-${dua.id}`} className="mb-4 p-2 border rounded">
              <h2 className="font-semibold">{dua.dua_name_en}</h2>
              {/* Add more dua info if needed */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
