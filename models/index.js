import Sequelize from "sequelize";
import sequelize from "../config/database.js";
import artistModel from "./artist.js";
import songModel from "./song.js";
import sampleModel from "./sample.js";

const Artist = artistModel(sequelize, Sequelize.DataTypes);
const Song = songModel(sequelize, Sequelize.DataTypes);
const Sample = sampleModel(sequelize, Sequelize.DataTypes);

// associations
Artist.hasMany(Song);
Song.belongsTo(Artist);
Song.belongsToMany(Song, {
  as: "SampledSongs",
  through: Sample,
  foreignKey: "samplingSongId",
  otherKey: "sampledSongId",
});
Song.belongsToMany(Song, {
  as: "SamplingSongs",
  through: Sample,
  foreignKey: "sampledSongId",
  otherKey: "samplingSongId",
});

export default {
  sequelize,
  Sequelize,
  Artist,
  Song,
  Sample,
};
