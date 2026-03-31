import { useMood } from "../context/MoodContext";
import Choice from "./Choice";
import Palette from "./Palette";

const Body = () => {
  const { selectedMood } = useMood();

  console.log(selectedMood.bg_color);

  return (
    <div className="max-w-2xl mx-auto my-2.5 space-y-8">
      <div>
        <h5 className="font-body text-[12px] tracking-widest mb-1">
          MOOD BOARD
        </h5>
        <h1
          style={{
            color: selectedMood.bg_color,
          }}
          className="font-heading font-semibold text-4xl"
        >
          {selectedMood?.name}
        </h1>
      </div>
      <div>
        <Choice />
      </div>

      <div>
        <Palette />
      </div>
    </div>
  );
};

export default Body;
