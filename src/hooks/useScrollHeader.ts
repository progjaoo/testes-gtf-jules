import { useEffect, useState } from "react";

export function useScrollHeader() {
  const [showTop, setShowTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showTop };
}
