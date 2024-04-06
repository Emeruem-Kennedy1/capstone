export default (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Artist;
};
