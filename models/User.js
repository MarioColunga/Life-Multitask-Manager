const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(value) {
    return bcrypt.compareSync(value, this.dataValues.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.dataValues.password = await bcrypt.hash(
          newUserData.dataValues.password,
          10
        );
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.dataValues.password = await bcrypt.hash(
          updatedUserData.dataValues.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
  }
);

module.exports = User;
