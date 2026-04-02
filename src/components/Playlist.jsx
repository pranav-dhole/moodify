import { useEffect, useState } from "react";
import { useMood } from "../context/MoodContext";
import romanticPlay from "../../assets/romantic-play.svg";
import happyPlay from "../../assets/happy-play.svg";
import energeticPlay from "../../assets/energetic-play.svg";
import melanCholicPlay from "../../assets/melancholic-play.svg";
import chillPlay from "../../assets/chill-play.svg";
const apiKey = import.meta.env.VITE_API_KEY;
const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

const Playlist = () => {
  const { selectedPalette } = useMood();
  const [songs, setSongs] = useState([]);

  const fetchPlaylist = async () => {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${selectedPalette.name.toLowerCase()}&api_key=${apiKey}&format=json`,
    );
    const data = await res.json();
    setSongs(data.tracks.track.slice(0, 3) || []);
  };

  const getYouTubeId = async (trackName, artistName) => {
    const query = encodeURIComponent(
      `${trackName} ${artistName} official audio`,
    );
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeKey}&maxResults=1&type=video`,
    );
    const data = await res.json();

    console.log("youtube", data?.items);

    return data.items[0]?.id?.videoId;
  };

  const handleSongClick = async (track) => {
    const videoId = await getYouTubeId(track.name, track.artist.name);
    if (videoId) {
      console.log("Play this ID in your YouTube Player:", videoId);
      // Here you would call a function from your PlayerContext to play this ID
    }
  };

  const VIBE_ICONS = {
    chill: chillPlay,
    romantic: romanticPlay,
    happy: happyPlay,
    energetic: energeticPlay,
    melancholic: melanCholicPlay,
    // Default fallback if a mood doesn't match
    default: romanticPlay,
  };

  const currentIcon =
    VIBE_ICONS[selectedPalette.name.toLowerCase()] || VIBE_ICONS["default"];

  useEffect(() => {
    // fetchPlaylist();
  }, [selectedPalette]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {songs.map((track, i) => (
          <div
            key={i}
            style={{
              backgroundColor: selectedPalette.color_shades[0].color,
            }}
            className="p-3 rounded-lg cursor-pointer hover:bg-gray-200 flex justify-between items-center"
          >
            {/*  add song profile image */}
            {/* <div>
              <img  />
            </div> */}
            <div>
              <p className="font-bold">{track.name}</p>
              <p className="text-gray-500 text-xs">{track.artist.name}</p>
            </div>
            <span
              className="text-xs text-blue-500"
              onClick={() => handleSongClick(track)}
            >
              <img
                src={currentIcon}
                alt={selectedPalette.name}
                className="w-10 h-10 "
              />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2"></div>
    </div>
  );
};

export default Playlist;
