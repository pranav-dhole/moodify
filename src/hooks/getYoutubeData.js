const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getYouTubeData = async (trackName, artistName) => {
  try {
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
  } catch (err) {
    console.error(err.message);
  }
};
