export default (sequelize, DataTypes) => {
  const SongGenre = sequelize.define("SongsGenres", {
    songId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Songs",
        key: "id",
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Genres",
        key: "id",
      },
    },
  });

  return SongGenre;
};
