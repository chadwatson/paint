import { useState, useEffect } from "react";

export default function useCursor(active = true) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(
    () => {
      const handleMouseMove = ({ pageX, pageY }) => {
        if (active) {
          setCursor({ x: pageX, y: pageY });
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    },
    [active]
  );

  return cursor;
}
