/**
 * Cleans the artist name by removing the year and splitting multiple artists into a list.
 * @param {string} artist - The artist name to be cleaned.
 * @returns {string[]} - An array of cleaned artist names.
 */
function cleanArtist(artist) {
  // remove year from artist name
  const cleanedArtist = artist.replace(/\s\(\d{4}\)/, "");
  // split artists to a list
  const artists = cleanedArtist
    .split(/,|feat\.?/)
    .map((artist) => artist.trim());
  return artists;
}

/**
 * get the genres of the song eg
 * Hip-Hop / Rap / R&B -> ['Hip-Hop', 'Rap', 'R&B']
 * @param {string} genre - The genre of the song.
 * @returns {string[]} - An array of genres.
 */
function getGenres(genre) {
  return genre.split(" / ").map((genre) => genre.trim());
}

/**
 * get the sample type of the song eg
 * Drums -> ['Drums']
 * Vocals / Lyrics -> ['Vocals', 'Lyrics']
 * @param {string} sampleType - The sample type of the song.
 * @returns {string[]} - An array of sample types.
 */
function getSampleType(sampleType) {
  return sampleType.split(" / ").map((type) => type.trim());
}

/**
 * clean the data from the web scrapper that looks like this:
 *{"Song Name": {
    "samples": [
      {
        "title": "",
        "artist": "",
        "sampleType": "",
        "genre": "",
        "detailUrl": ""
      },
    ],
    "sampled": [
      {
        "title": "",
        "artist": "",
        "sampleType": "",
        "genre": "",
        "detailUrl": ""
      },
    ]
  }
}

  * @param {object} data - The data to be cleaned.
  * @returns {object} - The cleaned data.
  */
function cleanData(data) {
  const cleanedData = {};
  for (const [songName, categories] of Object.entries(data)) {
    cleanedData[songName] = {};
    for (const [category, samples] of Object.entries(categories)) {
      // Ensure samples is an array before calling map
      if (Array.isArray(samples)) {
        cleanedData[songName][category] = samples.map((sample) => {
          const { title, artist, sampleType, genre, detailUrl } = sample;
          return {
            title: title.trim(), // Trim title to remove unwanted whitespace
            artist: cleanArtist(artist)[0], // Only use the first artist for now [TODO: Handle multiple artists
            features: cleanArtist(artist).slice(1), // Use the rest of the artists as features
            sampleTypes: getSampleType(sampleType),
            genres: getGenres(genre),
            detailUrl,
          };
        });
      } else {
        // Handle case where samples is not an array
        cleanedData[songName][category] = []; // Default to an empty array if samples is not as expected
      }
    }
  }
  return cleanedData;
}

export { cleanData };
