import { useStation } from "@/contexts/StationContext";

interface AdBannerProps {
  text?: string;
}


export function AdBanner({ text = "ANUNCIE AQUI" }: AdBannerProps) {
  const { currentStation } = useStation();

  return (
    <div
      className="ad-banner w-full max-w-[970px] h-[177px] mx-auto my-6 flex items-center justify-center text-lg font-bold rounded-md cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        backgroundColor: currentStation.color, // 🔥 COR DINÂMICA
        color: "#fff",
      }}
    >
      {text}
    </div>
  );
}
