'use client';
import { fetchAllStructuredData, fetchAllDuas, Category, Dua, Subcategory } from '@/app/constants/data';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Record<number, Subcategory[]>>({});
  const [duas, setDuas] = useState<Record<number, Dua[]>>({});
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [expandedSubcatId, setExpandedSubcatId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllStructuredData();
      setCategories(data);
    };
    getData();
  }, []);

  const handleCategoryClick = (catId: number) => {
    setExpandedCategoryId(expandedCategoryId === catId ? null : catId);

    // Set subcategories from already-fetched categories
    if (!subcategories[catId]) {
      const cat = categories.find((c) => c.id === catId);
      if (cat && cat.subcategories) {
        setSubcategories((prev) => ({ ...prev, [catId]: cat.subcategories }));
      }
    }
    setExpandedSubcatId(null); // Collapse any open subcategory when switching category
  };

  const handleSubcategoryClick = async (subcatId: number) => {
    setExpandedSubcatId(expandedSubcatId === subcatId ? null : subcatId);

    if (!duas[subcatId]) {
      const data = await fetchAllDuas(subcatId);
      setDuas((prev) => ({ ...prev, [subcatId]: data }));
    }
  };

  const scrollToDuaSection = (duaId: number) => {
    const el = document.getElementById(`dua-${duaId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-64 p-4 border-r overflow-y-auto h-screen">
      <h2 className="font-bold mb-2">Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => handleCategoryClick(cat.id)}
              className="w-full text-left text-blue-600 hover:underline"
            >
              {cat.cat_name_en}
            </button>

            {/* Subcategories */}
            {expandedCategoryId === cat.id && subcategories[cat.id] && (
              <ul className="ml-4 mt-1">
                {subcategories[cat.id].map((subcat) => (
                  <li key={subcat.id}>
                    <button
                      onClick={() => handleSubcategoryClick(subcat.id)}
                      className="text-left text-green-600 hover:underline"
                    >
                      {subcat.subcat_name_en}
                    </button>

                    {/* Duas */}
                    {expandedSubcatId === subcat.id && duas[subcat.id] && (
                      <ul className="ml-4 mt-1">
                        {duas[subcat.id].map((dua) => (
                          <li key={dua.id}>
                            <button
                              onClick={() => scrollToDuaSection(dua.id)}
                              className="text-left text-purple-600 hover:underline"
                            >
                              {dua.dua_name_en}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
