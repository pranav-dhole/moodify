import { useEffect, useState } from "react";
import { useMood } from "../context/MoodContext";
import { VIBE_ICONS } from "../utils/vibeIcons";
const apiKey = import.meta.env.VITE_API_KEY;
const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

const Playlist = () => {
  const { selectedPalette } = useMood();
  const [songs, setSongs] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    id: null,
    title: "",
    artist: "",
    thumb: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchPlaylist = async () => {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${selectedPalette.name.toLowerCase()}&api_key=${apiKey}&format=json`,
    );
    const data = await res.json();
    setSongs(data.tracks.track.slice(0, 3) || []);
  };

  const getYouTubeData = async (trackName, artistName) => {
    const query = encodeURIComponent(
      `${trackName} ${artistName} official audio`,
    );
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeKey}&maxResults=1&type=video`,
    );
    const data = await res.json();
    const item = data.items[0];

    return {
      id: item?.id?.videoId,
      thumb: item?.snippet?.thumbnails?.default?.url,
    };
  };

  const handleSongClick = async (track) => {
    // If it's the same song, just toggle play/pause
    if (currentVideo.id && currentVideo.title === track.name) {
      setIsPlaying(!isPlaying);
      return;
    }

    const ytData = await getYouTubeData(track.name, track.artist.name);
    if (ytData.id) {
      setCurrentVideo({
        id: ytData.id,
        title: track.name,
        artist: track.artist.name,
        thumb: ytData.thumb,
      });
      setIsPlaying(true);
    }
  };

  const moodKey = selectedPalette.name.toLowerCase();
  const playIcon = VIBE_ICONS.play[moodKey] || VIBE_ICONS.play.default;
  const pauseIcon = VIBE_ICONS.pause[moodKey] || VIBE_ICONS.pause.default;

  useEffect(() => {
    // fetchPlaylist();
  }, [selectedPalette]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. THE PLAYLIST ITEMS */}
      <div className="grid grid-cols-1 gap-2">
        {songs.map((track, i) => {
          const isThisPlaying = isPlaying && currentVideo.title === track.name;
          return (
            <div
              key={i}
              style={{ backgroundColor: selectedPalette.color_shades[0].color }}
              className="p-3 rounded-xl hover:brightness-95 flex justify-between items-center transition-all border border-black/5"
            >
              <div>
                <p className="font-bold text-gray-800">{track.name}</p>
                <p className="text-gray-500 text-xs">{track.artist.name}</p>
              </div>
              <img
                src={isThisPlaying ? pauseIcon : playIcon}
                onClick={() => handleSongClick(track)}
                alt="status"
                className="w-10 h-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              />
            </div>
          );
        })}
      </div>

      {/* 2. THE MINI MEDIA PLAYER BAR */}
      {currentVideo.id && (
        <div
          className="mt-4 p-3 rounded-2xl flex items-center justify-between shadow-lg border border-black/5"
          style={{
            backgroundColor:
              selectedPalette.color_shades[0]?.color || "#1f2937",
          }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Thumbnail on the left */}
            <img
              src={currentVideo.thumb}
              alt="thumb"
              className="w-12 h-12 rounded-lg object-cover shadow-md border border-white/10"
            />
            <div className="truncate">
              <p className="font-bold text-sm truncate">{currentVideo.title}</p>
              <p className="text-[10px] opacity-70 truncate">
                {currentVideo.artist}
              </p>
            </div>
          </div>

          {/* Toggle Button on the right */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="shrink-0 ml-2 hover:scale-110 active:scale-95 transition-transform"
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              className="w-10 h-10 cursor-pointer"
              alt="control"
            />
          </button>

          {/* THE ACTUAL ENGINE (Invisible) */}
          <div className="hidden">
            {isPlaying && (
              <iframe
                width="1"
                height="1"
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
                allow="autoplay"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
