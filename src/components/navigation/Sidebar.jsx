import { useState } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white border-r
          transform transition-transform duration-300
          ${open || !isMobile ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button (mobile only) */}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            <X />
          </button>
        )}

        {/* Sidebar content */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-lg">Dashboard</h2>

          <nav className="space-y-2">
            <a className="block hover:text-pink-500">Overview</a>
            <a className="block hover:text-pink-500">Sales</a>
            <a className="block hover:text-pink-500">Reports</a>
          </nav>
        </div>
      </aside>
    </>
  );
}
