import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite:db.sqlite");

export const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const Cow = sequelize.define("Cow", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Cow.belongsTo(User);
User.hasMany(Cow);

await sequelize.sync();
