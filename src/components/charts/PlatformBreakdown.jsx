import { useState } from "react";
import { AnimatedTap } from "../ui/AnimatedTap";
import { FloatingPopover } from "../ui/FloatingPopover";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

export function PlatformItem({ label, value, percent, color }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [position, setPosition] = useState(null);

  return (
    <>
      <AnimatedTap
        onClick={(e) => {
          const box = e.currentTarget.getBoundingClientRect();
          setRect(box);
          setOpen(true);
        }}
        className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${color}`} />
          <span className="font-medium">{label}</span>
        </div>

        <span className="font-semibold">{percent}%</span>
      </AnimatedTap>

      <FloatingPopover open={open} anchorRect={rect}>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-gray-500 text-sm">{percent}% of total</p>
        <p className="text-lg font-bold mt-1">${value}</p>

        {/* <button
          onClick={() => setOpen(false)}
          className="mt-3 w-full bg-black text-white rounded-md py-1 text-sm"
        >
          Close
        </button> */}
      </FloatingPopover>
    </>
  );
}
