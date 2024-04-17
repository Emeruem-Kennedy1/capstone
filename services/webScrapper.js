import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { buildWhoSampledURL } from "../utils/urlBuilder.js";

puppeteer.use(StealthPlugin());

// ? Scrape more samples from the see all page (This does not contain the genre of the song)
async function scrapeSamplesFromTable(page) {
  return await page.evaluate(() => {
    // Initialize an array to hold all the samples data
    const samples = [];

    // Select the table body to iterate over its rows
    const tableRows = document.querySelectorAll(".table.tdata tbody tr");

    // Loop through each row in the table body
    tableRows.forEach((row) => {
      // Extract the relevant data for each sample
      const detailUrl = row.querySelector("td.tdata__td1 a").href;
      const songName = row.querySelector("td.tdata__td2").textContent.trim();
      const artistLinks = row.querySelectorAll("td.tdata__td3 a");
      const artists = Array.from(artistLinks)
        .map((link) => link.textContent.trim())
        .join(" and ");
      const year = row
        .querySelector("td.tdata__td3:nth-of-type(3)")
        .textContent.trim(); // Assuming the year is always in the third column
      const partSampled = row.querySelector("td.tdata__td3 .tdata__badge")
        ? row.querySelector("td.tdata__td3 .tdata__badge").textContent.trim()
        : "";

      // Add the sample data to the samples array
      samples.push({
        detailUrl,
        songName,
        artists,
        year,
        partSampled,
      });
    });

    // Return the filled samples array
    return samples;
  });
}

const scrapeCurrentSection = async (page, sectionTitle) => {
  return await page.evaluate((sectionTitle) => {
    const data = [];
    const sectionHeaders = document.querySelectorAll("h3.section-header-title");

    sectionHeaders.forEach((header) => {
      if (header.textContent.includes(sectionTitle)) {
        const section = header.closest("section");
        const entries = section.querySelectorAll(".listEntry.sampleEntry");

        entries.forEach((entry) => {
          const title =
            entry.querySelector(".trackDetails .trackName")?.textContent ||
            "Unknown";
          const artist =
            entry
              .querySelector(".trackDetails .trackArtist")
              ?.textContent.replace("by ", "")
              .trim() || "Unknown";
          const sampleType =
            entry.querySelector(".trackBadge .topItem")?.textContent ||
            "Unknown";
          const genre =
            entry.querySelector(".trackBadge .bottomItem")?.textContent ||
            "Unknown";
          const detailUrl = entry.querySelector("a")?.href;

          data.push({ title, artist, sampleType, genre, detailUrl });
        });
      }
    });

    return data;
  }, sectionTitle);
};

const getSongsData = async (songs) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    // abort requests for stylesheets and images
    page.on("request", (req) => {
      if (
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font" ||
        req.resourceType() === "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
    const allSongSamples = {};
    for (const song of songs) {
      const { artist, title } = song;
      const { base } = buildWhoSampledURL(artist, title, "samples");

      await page.goto(base, { waitUntil: "domcontentloaded" });

      const sectionHeaders = await page.evaluate(() => {
        const headers = [];
        document
          .querySelectorAll(".section .sectionHeader")
          .forEach((header) => {
            const title = header
              .querySelector(".section-header-title")
              .textContent.trim();
            const seeAllButton = header.querySelector("a.moreButton");
            headers.push({
              title,
              seeAllLink: seeAllButton ? seeAllButton.href : null,
            });
          });
        return headers;
      });

      let samples = {};
      for (const { title, seeAllLink } of sectionHeaders) {
        // only get the samples and sampled sections
        if (
          title.toLowerCase().includes("sample") ||
          title.toLowerCase().includes("sampled")
        ) {
          await page.goto(base, { waitUntil: "domcontentloaded" });
          const data = await scrapeCurrentSection(page, title);
          title.toLowerCase().includes("contains")
            ? (samples["samples"] = data)
            : (samples["sampled"] = data);
        }
      }
      allSongSamples[title] = samples;
    }

    await browser.close();
    return allSongSamples;
  } catch (error) {
    console.error("An error occurred while scraping the website:", error);
  }
};

export { getSongsData };
