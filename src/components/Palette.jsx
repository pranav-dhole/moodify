import { useState } from "react";
import { useMood } from "../context/MoodContext";

const Palette = () => {
  const { selectedPalette } = useMood();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(color);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h5 className="font-body text-[9px] lg:text-[12px] tracking-widest mt-6 mb-3">
        PALETTE
      </h5>
      <div className="flex flex-wrap gap-2">
        {selectedPalette.color_shades.map((shade) => {
          return (
            <div
              onClick={() => handleCopy(shade.color)}
              style={{ backgroundColor: shade.color }}
              className="w-[calc(50%-0.5rem)] h-18 md:h-22 rounded-xl bg-amber-200 relative p-2 cursor-pointer border border-black/10"
              key={shade.name}
            >
              <h6 className="absolute bottom-0 font-body text-[12px] lg:text-[14px] tracking-wider lg:tracking-widest m-1 lg:m-2 font-semibold">
                {copied === shade.color ? "✅ Copied" : shade.name}
              </h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Palette;
