/**
 * Constructs a WhoSampled URL given a song title and artist name.
 * @param {string} artistName - The name of the artist.
 * @param {string} songTitle - The title of the song.
 * @param {string} relationship - One of "samples" or "sampled"
 * @returns {object} - An object containing the URLs for the base page and the specified relationship page.
 */
function buildWhoSampledURL(artistName, songTitle, relationship) {
  const baseUrl = "https://www.whosampled.com";
    
    function formatForURL(text) {
      let formattedText = text.replace(/\s+/g, "-"); // Replace spaces with hyphens

      // Encode characters that have special meanings in URLs
      // Extend with more replacements if needed, following the pattern above

      formattedText = encodeURIComponent(formattedText)
        .replace(/[!'*]/g, (c) => `%${c.charCodeAt(0).toString(16)}`) // Further URI encoding for special characters
        .replace(/%2F/g, "/") // Keep forward slashes as they are
        .replace(/%28/g, "(") // Decode %28 back to '('
        .replace(/%29/g, ")") // Decode %29 back to ')'
      
      return formattedText;
    }

    const formattedArtistName = formatForURL(artistName);
    const formattedSongTitle = formatForURL(songTitle);

  const urls = {
    base: `${baseUrl}/${formattedArtistName}/${formattedSongTitle}/`,
    relationship: `${baseUrl}/${formattedArtistName}/${formattedSongTitle}/${relationship}/`,
  };
  return urls;
}

export { buildWhoSampledURL };
