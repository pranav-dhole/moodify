import { useState } from "react";
import { useMood } from "../context/MoodContext";

const Palette = () => {
  const { selectedPalette } = useMood();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (color) => {
    await navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <h5 className="font-body text-[12px] font-normal tracking-widest my-4">
        PALETTE
      </h5>
      <div className="flex gap-2">
        {selectedPalette.color_shades.map((shade) => {
          return (
            <div
              onClick={() => handleCopy(shade.color)}
              style={{ backgroundColor: shade.color }}
              className="w-1/4 h-22 rounded-xl bg-amber-200 relative p-2 cursor-pointer"
              key={shade.name}
            >
              <h6 className="absolute bottom-0 font-body text-[14px] tracking-widest m-2 font-semibold">
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
