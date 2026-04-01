import { useMood } from "../context/MoodContext";

const Vibes = () => {
  const { selectedPalette, selectedMood } = useMood();

  return (
    <div>
      <h5 className="font-body text-[12px] tracking-widest my-4">VIBES</h5>
      <div className="font-body text-[14px] tracking-wider font-semibold flex gap-2">
        {selectedPalette?.vibes.map((vibe) => {
          return (
            <div
              key={vibe}
              className=" px-4 py-1 rounded-3xl active:border-0 select-none"
              style={{
                backgroundColor: selectedPalette?.color_shades[0]?.color,
                boxShadow: `inset 0 0 0 1px ${selectedPalette?.color_shades[2]?.color}`,
              }}
            >
              {vibe}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vibes;
