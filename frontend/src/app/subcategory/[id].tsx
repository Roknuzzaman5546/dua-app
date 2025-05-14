import { GetStaticPaths, GetStaticProps } from 'next';

type Dua = {
  id: number;
  dua_en: string;
};

export default function SubcategoryPage({ duas }: { duas: Dua[] }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Duas</h1>
      <ul>
        {duas.map((dua) => (
          <li key={dua.id} className="mb-2 border-b pb-2">
            <p>{dua.dua_en}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:5000/api/all-subcategories');
  const data = await res.json();
  const paths = data.map((sub: any) => ({ params: { id: sub.id.toString() } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/duas/${params?.id}`);
  const data = await res.json();

  return {
    props: {
      duas: data,
    },
  };
};
