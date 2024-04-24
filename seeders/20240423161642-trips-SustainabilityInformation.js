"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SustainabilityInformations", [
      {
        destination: "Lagos (LOS)",
        sustainabilityScore: "900",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        destination: "Abuja (ABV)",
        sustainabilityScore: "70",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        destination: "Mumbai (Bombay) (BOM)",
        sustainabilityScore: "50",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("SustainabilityInformation", null, {});
  },
};
