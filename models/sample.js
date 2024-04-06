export default (sequelize, DataTypes) => {
  const Sample = sequelize.define("Sample", {
    details: DataTypes.TEXT,
  });

  return Sample;
};
