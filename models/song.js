export default (sequelize, DataTypes) => {
  const Song = sequelize.define("Song", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
    },
  });

  return Song;
};
