import { duas } from '@/app/constants/data';
import DuaCard from '@/components/DuaCard';

export default function DuaPage({ params }: { params: { duaId: string } }) {
  const dua = duas.find(d => d.dua_id === +params.duaId);
  if (!dua) return <div>Dua not found.</div>;
  return <DuaCard dua={dua} />;
}