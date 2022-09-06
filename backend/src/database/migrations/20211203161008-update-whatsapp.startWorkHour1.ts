import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return  queryInterface.addColumn("Whatsapps", "startWorkHour1", {
        type: DataTypes.TEXT,
        allowNull: true
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Whatsapps", "startWorkHour1");
  }
};
