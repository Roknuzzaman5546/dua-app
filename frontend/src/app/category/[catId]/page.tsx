"use client";
import { fetchAllStructuredData, Category, fetchAllDuas, Dua } from '@/app/constants/data';
import DuaCard from '@/components/DuaCard';
import { useEffect, useState } from 'react';

export default function CategoryPage({ params }: { params: { catId: string } }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [duas, setDuas] = useState<Dua[]>([]);

  useEffect(() => {
    const getData = async () => {
      const cats = await fetchAllStructuredData();
      setCategories(cats);
      const allDuas = await fetchAllDuas();
      setDuas(allDuas);
    };
    getData();
  }, []);

  const category = categories.find(c => c.id === +params.catId);

  // Get all dua IDs from subcategories
  const duaIds = category?.subcategories?.flatMap(sub => sub.duas) || [];
  // Find the dua objects for these IDs
  
  const subDuas = duas.filter(d => duaIds.includes(d.dua_id));
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold text-[#19483f] mb-4">{category?.name_en}</h1>
        {subDuas.map((dua) => (
          <DuaCard key={dua.id} dua={dua} />
        ))}
      </div>
    </div>
  );
}