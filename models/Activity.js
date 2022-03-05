const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Activity extends Model {}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    deadline: {
      type: DataTypes.DATEONLY,
    },
    start: {
      type: DataTypes.TIME,
    },
    end: {
      type: DataTypes.TIME,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "activities",
  }
);

module.exports = Activity;
