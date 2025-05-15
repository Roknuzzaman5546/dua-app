// Example: src/components/AudioPlayer.tsx
export default function AudioPlayer({ src }: { src: string }) {
  return (
    <audio controls className="w-full">
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}