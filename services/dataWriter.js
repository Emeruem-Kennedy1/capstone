import db from "../models/index.js";

async function importData(jsonData) {
  for (const [key, value] of Object.entries(jsonData)) {
    const songTitle = key.split(" by ")[0];
    const mainArtistName = key.split(" by ")[1].split(" (")[0];
    const genre = key.split(" (")[1].split("):")[0].toLowerCase();

    // Find or create the main artist
    const [mainArtist, mainArtistCreated] = await db.Artist.findOrCreate({
      where: { name: mainArtistName },
    });

    // Find or create the main song and link it to the main artist
    const [mainSong, mainSongCreated] = await db.Song.findOrCreate({
      where: { title: songTitle, artistId: mainArtist.id },
      defaults: {
        title: songTitle,
        detailedURL: value.detailUrl,
        artistId: mainArtist.id,
      },
    });

    // Find or create the genre
    const [mainGenre, mainGenreCreated] = await db.Genre.findOrCreate({
      where: { name: genre },
    });

    // Link the main song to the genre if it's not already linked
    const songGenre = await db.SongGenre.findOne({
      where: { songId: mainSong.id, genreId: mainGenre.id },
    });
    if (!songGenre) {
      await db.SongGenre.create({
        songId: mainSong.id,
        genreId: mainGenre.id,
      });
    }

    // Handle the samples where the main song is sampling other songs
    for (const sample of value.samples) {
      await handleSample(mainSong, sample, false);
    }

    // Handle the samples where the main song is sampled by other songs
    for (const sample of value.sampled) {
      await handleSample(mainSong, sample, true);
    }
  }
}

async function handleSample(mainSong, sampleData, isSampled) {
  const { title, artist: sampleArtistName, detailUrl, genres } = sampleData;

  // Find or create the sampled artist
  const [sampleArtist, sampleArtistCreated] = await db.Artist.findOrCreate({
    where: { name: sampleArtistName },
  });
  // Find or create the sampled song
  const [sampleSong, sampleSongCreated] = await db.Song.findOrCreate({
    where: { title, artistId: sampleArtist.id },
    defaults: { title, detailedURL: detailUrl, artistId: sampleArtist.id },
  });

  // Create a sample linking the main song and the sampled song if it doesn't already exist
  const sample = await db.Sample.findOne({
    where: {
      samplingSongId: isSampled ? sampleSong.id : mainSong.id,
      sampledSongId: isSampled ? mainSong.id : sampleSong.id,
    },
  });

  if (!sample) {
    await db.Sample.create({
      samplingSongId: isSampled ? sampleSong.id : mainSong.id,
      sampledSongId: isSampled ? mainSong.id : sampleSong.id,
    });
  }

  // Link the sampled song to the genres if they're not already linked
  for (const genre of genres) {
    const [sampleGenre, sampleGenreCreated] = await db.Genre.findOrCreate({
      where: { name: genre.toLowerCase() },
    });

    const songGenre = await db.SongGenre.findOne({
      where: { songId: sampleSong.id, genreId: sampleGenre.id },
    });

    if (!songGenre) {
      await db.SongGenre.create({
        songId: sampleSong.id,
        genreId: sampleGenre.id,
      });
    }
  }
}

export { importData };
