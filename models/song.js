export default (sequelize, DataTypes) => {
  const Song = sequelize.define("Song", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailedURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Artists",
        key: "id",
      },
    },
  });

  return Song;
};
