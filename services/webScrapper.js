import axios from "axios";
import * as cheerio from "cheerio";
import artist from "../models/artist";

const BASE_URL = `https://www.whosampled.com/`;

const getSongData = async (title, artist) => {
    try {
        const { data } = await axios.get(`${BASE_URL}${title}`);
        const $ = cheerio.load(data);
        const song = {
        title: title,
        artist: artist,
        year: $("span.trackYear").text(),
        samples: []
        };
        $("div.sampleEntry").each((index, element) => {
        const sample = {
            title: $(element).find("span.sampleTrackTitle").text(),
            artist: $(element).find("span.sampleTrackArtist").text(),
            year: $(element).find("span.sampleTrackYear").text()
        };
        song.samples.push(sample);
        });
        return song;
    } catch (error) {
        console.error("Error getting song data:", error);
        throw error;
    }
};

export {
    getSongData
}