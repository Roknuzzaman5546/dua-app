'use client';
import DuaCard from "@/components/DuaCard";
import React, { useEffect, useState } from 'react';
import { fetchAllDuas, Dua } from "@/app/constants/data";

export default function Home() {
  const [duas, setDuas] = useState<Dua[]>([]);
  // console.log(duas)

  useEffect(() => {
    const getData = async () => {
      const allDuas = await fetchAllDuas();
      setDuas(allDuas);
    };
    getData();
  }, []);

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">All Duas</h1>
          {duas.map((dua) => (
            <DuaCard key={dua.dua_id} dua={dua} />
          ))}
        </div>
      </main>
    </div>
  );
}
