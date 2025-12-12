import { TopHeader } from "./TopHeader";
import { EditorialBar } from "./EditorialBar";
import { CategoryNav } from "./CategoryNav";
import { useScrollHeader } from "@/hooks/useScrollHeader";

export function StickyHeader() {
  const { showTop } = useScrollHeader();

  return (
    <div className="sticky top-0 z-50">
      {/* Some ao rolar */}
      <div
        className={`transition-all duration-300 ${
          showTop ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <TopHeader />
      </div>

      {/* Ficam fixos */}
      <EditorialBar />
      <CategoryNav />
    </div>
  );
}
