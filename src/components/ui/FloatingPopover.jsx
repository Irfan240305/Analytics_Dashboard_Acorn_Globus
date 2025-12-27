import { useEffect, useRef } from "react";

export function FloatingPopover({ open, x, y, children }) {
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // trigger close by dispatching custom event
        document.dispatchEvent(new CustomEvent("close-popover"));
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!open || !x || !y) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: y + 12,
        left: x + 12,
        zIndex: 9999,
      }}
      className="bg-black text-white rounded-xl shadow-xl px-4 py-3 min-w-[160px] animate-fade-in"
    >
      {children}
    </div>
  );
}
