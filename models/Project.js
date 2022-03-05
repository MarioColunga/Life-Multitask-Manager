const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class Project extends Model {}

Project.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    projectName: {
      type: DataTypes.STRING
    },
    projectDescription: {
      type: DataTypes.STRING
    },
    userId: { 
      type: DataTypes.INTEGER,
      references: {
          model:"User",
          key: "user_id"
      }
    },
    deadLine: {
      type: DataTypes.DATE
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'project'
  }
);

module.exports = Project;
