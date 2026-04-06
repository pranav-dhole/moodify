import { useEffect, useRef, useState } from "react";
import { useMood } from "../context/MoodContext";
import { VIBE_ICONS } from "../utils/vibeIcons";
import { getYouTubeData } from "../hooks/getYoutubeData";
const apiKey = import.meta.env.VITE_API_KEY;

const loadYoutubeApi = async () => {
  try {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    });
  } catch (err) {
    console.error(err.message);
  }
};

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
  const playerRef = useRef(null);
  const playerRefId = "yt-player-div";

  useEffect(() => {
    try {
      loadYoutubeApi().then((YT) => {
        playerRef.current = new YT.Player(playerRefId, {
          height: "1",
          width: "1",
          videoId: "",
          playerVars: { autoplay: 0 },
          events: {
            onStateChange: (event) => {
              const { data } = event;
              const { PLAYING, PAUSED, ENDED } = YT?.PlayerState;
              if (data === PLAYING) setIsPlaying(true);
              if (data === PAUSED) setIsPlaying(false);
              if (data === ENDED) setIsPlaying(false);
            },
          },
        });
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !currentVideo.id) return;

    if (isPlaying) {
      player.playVideo?.();
    } else {
      player.pauseVideo?.();
    }
  }, [isPlaying]);

  const fetchPlaylist = async () => {
    try {
      console.log("playlist");

      const res = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${selectedPalette.name.toLowerCase()}&api_key=${apiKey}&format=json`,
      );
      const data = await res.json();
      setSongs(data.tracks.track.slice(0, 4) || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSongClick = async (track) => {
    try {
      const player = playerRef.current;
      // If it's the same song, just toggle play/pause
      if (currentVideo.id && currentVideo.title === track.name) {
        setIsPlaying((prev) => !prev);
        return;
      }

      const ytData = await getYouTubeData(track.name, track.artist.name);
      if (ytData.id && player) {
        if (ytData.id) {
          setCurrentVideo({
            id: ytData.id,
            title: track.name,
            artist: track.artist.name,
            thumb: ytData.thumb,
          });
          player.loadVideoById(ytData.id);
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const moodKey = selectedPalette.name.toLowerCase();
  const playIcon = VIBE_ICONS.play[moodKey] || VIBE_ICONS.play.default;
  const pauseIcon = VIBE_ICONS.pause[moodKey] || VIBE_ICONS.pause.default;

  useEffect(() => {
    fetchPlaylist();
  }, [selectedPalette]);

  return (
    <div className="flex flex-col gap-3">
      <h5 className="font-body text-[9px] lg:text-[12px] tracking-widest mt-4">
        PLAYLIST
      </h5>
      <div className="hidden">
        <div id={playerRefId} />
      </div>
      {/* 1. THE PLAYLIST ITEMS */}
      <div className="grid grid-cols-1 gap-2">
        {songs.map((track, i) => {
          const isThisPlaying = isPlaying && currentVideo.title === track.name;
          return (
            <div
              key={i}
              style={{
                backgroundColor: selectedPalette.color_shades[0].color,
                boxShadow: `inset 0 0 0 1px ${selectedPalette?.color_shades[2]?.color}`,
              }}
              className="p-3 rounded-xl hover:brightness-96 flex justify-between items-center transition-all shadow-sm"
            >
              <div>
                <p className="font-bold text-gray-800 text-[14px] lg:text-[16px]">
                  {track.name}
                </p>
                <p className="text-gray-500 text-[10px] lg:text-xs">
                  {track.artist.name}
                </p>
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
          className="mt-1 p-3 rounded-2xl flex items-center justify-between shadow-lg"
          style={{
            backgroundColor:
              selectedPalette.color_shades[0]?.color || "#1f2937",
            boxShadow: `inset 0 0 0 1px ${selectedPalette?.color_shades[2]?.color}`,
          }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Thumbnail on the left */}
            <img
              src={currentVideo.thumb}
              alt="thumb"
              className="w-12 h-12 rounded-lg object-cover shadow-md"
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
            onClick={() => setIsPlaying((prev) => !prev)}
            className="shrink-0 ml-2 hover:scale-110 active:scale-95 transition-transform"
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              className="w-10 h-10 cursor-pointer"
              alt="control"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Playlist;
