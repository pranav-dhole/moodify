import { useMood } from "../context/MoodContext";
import Choice from "./Choice";
import Palette from "./Palette";
import Playlist from "./Playlist";
import Vibes from "./Vibes";

const Body = () => {
  const { selectedMood } = useMood();

  return (
    <div className="max-w-3xl mx-3 md:mx-8 lg:mx-auto my-5.5 space-y-4 lg:space-y-8 overflow-x-hidden">
      <div>
        <h5 className="font-body text-[9px] lg:text-[12px] tracking-widest">
          MOOD BOARD
        </h5>
        <h1
          style={{
            color: selectedMood.bg_color,
          }}
          className="font-heading font-semibold text-3xl lg:text-4xl"
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

      <div>
        <Vibes />
      </div>

      <div>
        <Playlist />
      </div>
    </div>
  );
};

export default Body;
