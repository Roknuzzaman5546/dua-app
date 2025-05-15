import AudioPlayer from './AudioPlayer';

export default function DuaCard({ dua }: { dua: any }) {
  return (
    <div  id={`dua-${dua.id}`} className="scroll-mt-28 bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-[#19483f] mb-2">{dua.dua_name_en}</h2>
      <p className="text-gray-800 mb-3 whitespace-pre-wrap">{dua.top_en}</p>
      <div className="text-right text-2xl font-serif leading-relaxed mb-3">{dua.dua_arabic}</div>
      <p className="italic text-sm text-gray-600 mb-2">{dua.transliteration_en}</p>
      <p className="text-gray-700 mb-2">{dua.translation_en}</p>
      <p className="text-gray-500 text-sm mb-2">Reference: {dua.refference_en}</p>
      <AudioPlayer src={dua.audio} />
    </div>
  );
}