import express from "express";
import db from "./models/index.js";
// import { scrapeWebsite } from "./services/webScrapper.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Test database connection
async function testDBConnection() {
  try {
    await db.sequelize.authenticate();

    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Call the function to test DB connection
testDBConnection();

// routes 

// add a song
const addSong = async (songtitle) => {
  try {
    const song = await db.Song.create(songtitle);
    console.log("The song has been added");
    return song;
  } catch (error) {
    console.error("Unable to add the song:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to the music app!");
});

app.get("/songs", async (req, res) => {
    // const songs = scrapeWebsite("https://www.billboard.com/charts/hot-100");
    // res.json(songs);
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
