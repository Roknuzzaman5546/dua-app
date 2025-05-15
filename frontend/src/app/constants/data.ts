import axios from 'axios';

export interface Dua {
  id: number;
  dua_id: any;
  dua_name: string;
  top_en: string;
  dua_name_en: string;
  top_bn: string;
  translation_en: string;
  translation_bn: string;
  transliteration: string;
  reference: string;
  audio: string;
  subcat_id: number;
}

export interface Subcategory {
  id: number;
  name_en: string;
  name_bn: string;
  cat_id: number;
  duas?: Dua[];
  subcat_name_en: string;
}

export interface Category {
  id: number;
  name_en: string;
  name_bn: string;
  subcategories?: Subcategory[];
  cat_name_en: string;
}

// Change this baseURL to match your backend
const baseURL = 'http://localhost:5000/api'; // your backend server port

export const fetchAllStructuredData = async (): Promise<Category[]> => {
  try {
    const categoryRes = await axios.get(`${baseURL}/categories`);
    const categories: Category[] = categoryRes.data;

    for (const category of categories) {
      const subcategoryRes = await axios.get(
        `${baseURL}/subcategories/${category.id}`
      );
      const subcategories: Subcategory[] = subcategoryRes.data;

      for (const subcat of subcategories) {
        const duaRes = await axios.get(`${baseURL}/duas/${subcat.id}`);
        const duas: Dua[] = duaRes.data;
        subcat.duas = duas;
      }

      category.subcategories = subcategories;
    }

    return categories;
  } catch (error) {
    console.error('Failed to fetch structured data:', error);
    return [];
  }
};

export const fetchAllDuas = async (): Promise<Dua[]> => {
  try {
    const res = await axios.get(`${baseURL}/all-duas`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch all duas:', error);
    return [];
  }
};
