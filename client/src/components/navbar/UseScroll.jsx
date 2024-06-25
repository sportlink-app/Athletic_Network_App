import { useState, useEffect, useCallback } from "react";

const useScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const listener = useCallback(() => {
    const currentOffset = document.body.getBoundingClientRect();
    const currentScrollY = -currentOffset.top;
    const currentScrollX = currentOffset.left;

    setScrollY(currentScrollY);
    setScrollX(currentScrollX);
    setScrollDirection(lastScrollTop > currentScrollY ? "down" : "up");
    setLastScrollTop(currentScrollY);
  }, [lastScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(listener);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [listener]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
};

export default useScroll;
