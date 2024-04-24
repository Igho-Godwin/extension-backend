const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SustainabilityInformation extends Model {}

  SustainabilityInformation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      destination: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      sustainabilityScore: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SustainabilityInformation",
    }
  );

  return SustainabilityInformation;
};
