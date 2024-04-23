import express from "express";
import db from "./models/index.js";
import { getSongsData } from "./services/webScrapper.js";
import { cleanData } from "./utils/dataCleaners.js";
import { importData } from "./services/dataWriter.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Test database connection
async function testDBConnection() {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Call the function to test DB connection
testDBConnection();

app.get("/", (req, res) => {
  res.send("Welcome to the music app!");
  // time the function
  const start = Date.now();
  const songs = [
    {
      artist: "Kanye West",
      title: "Mercy",
      genre: "rap",
    },
    {
      artist: "Kanye West",
      title: "Stronger",
      genre: "rap",
    },
    {
      artist: "Jay-Z",
      title: "Dead Presidents",
      genre: "rap",
    },
  ];
  console.log(`Scapping ${songs.length} songs...`);
  const songsSamples = getSongsData(songs).then((data) => {
    const end = Date.now();
    const cleanedData = cleanData(data);
    importData(cleanedData);
    console.log(`Scraping took ${end - start} ms`);
    console.log("Data imported successfully");
  });
});

app.get("/songs", async (req, res) => {
  // const songs = scrapeWebsite("https://www.billboard.com/charts/hot-100");
  // res.json(songs);
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
