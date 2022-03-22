import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/sequelize";

interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
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
  },
  {
    sequelize: sequelize,
    tableName: "users",
  }
);
