import { useMood } from "../context/MoodContext";
import Choice from "./Choice";
import Palette from "./Palette";

const Body = () => {
  return (
    <div className="max-w-2xl mx-auto my-2.5 space-y-8">
      <div>
        <h5 className="font-body text-[12px] font-normal tracking-widest">
          MOOD BOARD
        </h5>
        <h1 className="font-heading font-semibold text-4xl">Romantic</h1>
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
