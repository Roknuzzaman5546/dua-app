'use client';
import {
  fetchAllStructuredData,
  fetchAllDuas,
  Category,
  Dua,
  Subcategory,
} from '@/app/constants/data';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaRegHandPaper, FaHome, FaBookmark, FaUsers, FaClipboardList, FaBars } from 'react-icons/fa';

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
    setExpandedSubcatId(null);

    if (!subcategories[catId]) {
      const cat = categories.find((c) => c.id === catId);
      if (cat && cat.subcategories) {
        setSubcategories((prev) => ({ ...prev, [catId]: cat.subcategories }));
      }
    }
  };

  const handleSubcategoryClick = async (subcatId: number) => {
    setExpandedSubcatId(expandedSubcatId === subcatId ? null : subcatId);
    if (!duas[subcatId]) {
      const res = await fetch(`http://localhost:5000/api/duas/${subcatId}`);
      const data = await res.json();
      setDuas((prev) => ({ ...prev, [subcatId]: data }));
    }
  };

  const scrollToDuaSection = (duaId: number) => {
    const el = document.getElementById(`dua-${duaId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-80 h-screen overflow-y-auto bg-[#eaf5ef] border-r px-0 py-0 flex flex-col">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="bg-[#cbead6] rounded-xl p-2">
          <FaRegHandPaper className="text-2xl text-[#2e7d5b]" />
        </div>
        <div>
          <div className="font-bold text-xl text-[#2e7d5b]">Dua <span className="text-gray-700">&</span> <span className="text-[#2e7d5b]">Ruqyah</span></div>
          <div className="text-xs text-gray-500">Hisnul Muslim</div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 px-4 py-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search By Category"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e7d5b] bg-white"
          />
        </div>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.cat_id)}
                className="flex items-center justify-between w-full text-left text-base font-semibold text-gray-800 hover:text-[#2e7d5b] py-2"
              >
                <span className="flex items-center gap-2">
                  <FaBookmark className="w-4 h-4 text-[#2e7d5b]" />
                  {cat.cat_name_en}
                </span>
                {expandedCategoryId === cat.cat_id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedCategoryId === cat.cat_id && subcategories[cat.cat_id] && (
                <ul className="ml-6 mt-2 space-y-1 border-l-2 border-dashed border-[#cbead6] pl-3">
                  {subcategories[cat.cat_id].map((subcat) => (
                    <li key={subcat.id}>
                      <button
                        onClick={() => handleSubcategoryClick(subcat.subcat_id)}
                        className="text-left w-full text-sm font-medium text-[#2e7d5b] hover:text-[#1b4d3e] flex items-center gap-2"
                      >
                        <span className="text-lg">-</span>
                        {subcat.subcat_name_en}
                      </button>

                      {expandedSubcatId === subcat.subcat_id && duas[subcat.subcat_id] && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {duas[subcat.subcat_id].map((dua) => (
                            <li key={dua.id}>
                              <button
                                onClick={() => scrollToDuaSection(dua.id)}
                                className="text-left text-xs text-gray-600 hover:text-[#7c3aed] pl-6"
                              >
                                ↳ {dua.dua_name_en}
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
      </nav>
      {/* Bottom Menu (optional, for icons) */}
      <div className="flex flex-col gap-4 px-6 py-4 border-t">
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#2e7d5b]">
          <FaHome /> Home
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#2e7d5b]">
          <FaClipboardList /> Categories
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#2e7d5b]">
          <FaUsers /> Community
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#2e7d5b]">
          <FaBookmark /> Bookmarks
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#2e7d5b]">
          <FaBars /> Menu
        </button>
      </div>
    </aside>
  );
}
