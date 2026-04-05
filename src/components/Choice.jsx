import { MOOD_TYPES } from "../utils/choiceData";
import { useMood } from "../context/MoodContext";

const Choice = () => {
  const { selectedMoodName, setSelectedMoodName } = useMood();

  return (
    <div className="font-body text-[12px] lg:text-[14px] tracking-wider font-semibold flex gap-2 flex-wrap">
      {MOOD_TYPES?.map((mood) => {
        return (
          <div
            onClick={() => setSelectedMoodName(mood.name)}
            style={
              selectedMoodName === mood.name
                ? {
                    backgroundColor: mood?.bg_color,
                  }
                : {
                    boxShadow: `inset 0 0 0 1px ${mood?.bg_color}`,
                    color: "black",
                  }
            }
            className="ring-1 text-white px-2.5 py-1 lg:px-4 lg:py-2 rounded-3xl w-fit active:border-0 cursor-pointer select-none"
            key={mood.id}
          >
            {mood.name}
          </div>
        );
      })}
    </div>
  );
};

export default Choice;
