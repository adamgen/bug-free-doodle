import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/sequelize";

interface ShowAttributes {
  id: string;
  dateAndTIme: Date;
  price: number;
}

export class Show extends Model<ShowAttributes> {
  public id!: number;
  public dateAndTIme!: Date;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Show.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    dateAndTIme: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "show",
  }
);
