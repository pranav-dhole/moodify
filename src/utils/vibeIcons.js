import romanticPlay from "../../assets/romantic-play.svg";
import happyPlay from "../../assets/happy-play.svg";
import energeticPlay from "../../assets/energetic-play.svg";
import melanCholicPlay from "../../assets/melancholic-play.svg";
import chillPlay from "../../assets/chill-play.svg";
import serenePlay from "../../assets/serene-play.svg";
import fieryPlay from "../../assets/fiery-play.svg";
import romanticPause from "../../assets/romantic-pause.svg";
import happyPause from "../../assets/happy-pause.svg";
import energeticPause from "../../assets/energetic-pause.svg";
import melanCholicPause from "../../assets/melancholic-pause.svg";
import chillPause from "../../assets/chill-pause.svg";
import serenePause from "../../assets/serene-pause.svg";
import fieryPause from "../../assets/fiery-pause.svg";

export const VIBE_ICONS = {
  play: {
    chill: chillPlay,
    romantic: romanticPlay,
    happy: happyPlay,
    energetic: energeticPlay,
    melancholic: melanCholicPlay,
    serene: serenePlay,
    fiery: fieryPlay,
    default: romanticPlay,
  },
  pause: {
    chill: chillPause,
    romantic: romanticPause,
    happy: happyPause,
    energetic: energeticPause,
    melancholic: melanCholicPause,
    serene: serenePause,
    fiery: fieryPause,
    default: romanticPause,
  },
};
