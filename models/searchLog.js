const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SearchLog extends Model {}

  SearchLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      origin: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      timeOfSearch: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sustainabilityScore: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SearchLog",
    }
  );

  return SearchLog;
};
