import SpotifyAPI from "../providers/spotify";
import LastFMAPI from "../providers/lastfm";
import dateToEpochWithOffset from "../helpers/dateEpochOffset";

async function lastWeek() {
  const api = new LastFMAPI();
  const comparisonStart = dateToEpochWithOffset(0, 12);
  const lastWeekStart = dateToEpochWithOffset(0, 6);
  const lastWeekEnd = dateToEpochWithOffset(23, 0);

  const comparisonTracks = await api
    .fetchTrackTotal(comparisonStart, lastWeekStart)
    .then((response) => response.json())
    .then((json) => Number(json.recenttracks["@attr"].total));
  const comparisonAlbums = await api
    .fetchAlbumTotal(comparisonStart, lastWeekStart)
    .then((response) => response.json())
    .then((json) => json.weeklyalbumchart.album.length);
  const lastWeekTracks = await api
    .fetchTrackTotal(lastWeekStart, lastWeekEnd)
    .then((response) => response.json())
    .then((json) => Number(json.recenttracks["@attr"].total));
  const lastWeekAlbums = await api
    .fetchAlbumTotal(lastWeekStart, lastWeekEnd)
    .then((response) => response.json())
    .then((json) => json.weeklyalbumchart.album.length);

  return {
    title: "Last week",
    tracks: {
      title: "Tracks",
      total: lastWeekTracks,
      difference: {
        total: Math.abs(lastWeekTracks - comparisonTracks),
        type: comparisonTracks > lastWeekTracks ? "negative" : "positive",
        icon: comparisonTracks > lastWeekTracks ? "&darr;" : "&uarr;",
      },
    },
    albums: {
      title: "Albums",
      total: lastWeekAlbums,
      difference: {
        total: Math.abs(lastWeekAlbums - comparisonAlbums),
        type: comparisonAlbums > lastWeekAlbums ? "negative" : "positive",
        icon: comparisonAlbums > lastWeekTracks ? "&darr;" : "&uarr;",
      },
    },
  };
}

async function thisWeek() {
  const api = new LastFMAPI();
  const date = new Date();
  const lastWeekEnd = dateToEpochWithOffset(23, 0);
  const now = Math.round(date.valueOf() / 1000).toString();

  const thisWeekTracks = await api
    .fetchTrackTotal(lastWeekEnd, now)
    .then((response) => response.json())
    .then((json) => json.recenttracks["@attr"].total);
  const thisWeekAlbums = await api
    .fetchAlbumTotal(lastWeekEnd, now)
    .then((response) => response.json())
    .then((json) => json.weeklyalbumchart.album.length);

  return {
    title: "This week (so far)",
    tracks: {
      title: "Tracks",
      total: thisWeekTracks,
    },
    albums: {
      title: "Albums",
      total: thisWeekAlbums,
    },
  };
}

async function topTracks() {
  const api = new SpotifyAPI();
  const response = await api.getTopTracks();
  const { items } = await response.json();

  const tracks = items.map((song) => {
    const artist = song.artists.map((_artist) => _artist.name).join(", ");
    return {
      id: song.id,
      artist,
      album: song.album.name,
      title: song.name,
      cover: {
        url: song.album.images[1].url,
        width: song.album.images[1].width,
        height: song.album.images[1].height,
        alt: `Cover art for ${song.album.name} by ${artist}`,
      },
      url: song.external_urls.spotify,
    };
  });

  return tracks;
}

async function topArtists() {
  const api = new SpotifyAPI();
  const response = await api.getTopArtists();
  const { items } = await response.json();

  return items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image: {
      url: artist.images[1].url,
      width: artist.images[1].width,
      height: artist.images[1].height,
      alt: `Photograph of the artist ${artist.name}`,
    },
    url: artist.external_urls.spotify,
  }));
}

async function music() {
  return {
    lastWeek: await lastWeek(),
    thisWeek: await thisWeek(),
    topTracks: await topTracks(),
    topArtists: await topArtists(),
  };
}

export default music;