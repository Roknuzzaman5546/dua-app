import { GetStaticPaths, GetStaticProps } from 'next';

type SubCategory = {
  id: number;
  name_en: string;
};

export default function CategoryPage({ subcategories }: { subcategories: SubCategory[] }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Subcategories</h1>
      <ul>
        {subcategories.map((sub) => (
          <li key={sub.id}>
            <a href={`/subcategory/${sub.id}`} className="text-blue-500">{sub.name_en}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:5000/api/categories');
  const data = await res.json();
  const paths = data.map((cat: any) => ({ params: { id: cat.id.toString() } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/category/${params?.id}`);
  const data = await res.json();

  return {
    props: {
      subcategories: data,
    },
  };
};
