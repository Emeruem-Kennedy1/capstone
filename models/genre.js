export default (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    });
    
    return Genre;
};
