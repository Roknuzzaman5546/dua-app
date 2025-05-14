'use client';
import React, { useEffect, useState } from 'react';

type Category = {
  id: number;
  name_en: string;
};

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(categories);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <aside className="w-64 p-4 border-r">
      <h2 className="font-bold mb-2">Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <a href={`/category/${cat.id}`} className="text-blue-500 hover:underline">
              {cat.name_en}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
