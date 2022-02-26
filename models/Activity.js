const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class Activity extends Model {}

Activity.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    activityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model:"Project",
            key: "projectId"
        }
    },
    activityName: {
      type: DataTypes.STRING
    },
    activityDescription: {
      type: DataTypes.STRING
    },
    activitydeadLine: {
      type: DataTypes.DATEONLY
    },
    startHour: {
      type: DataTypes.TIME
    },
    endHour: {
        type: DataTypes.TIME
    }
    },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'activity'
  }
);

module.exports = Activity;
