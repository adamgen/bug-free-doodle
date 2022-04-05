import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/sequelize";

interface MovieAttributes {
  id: string;
  title: string;
  imdbApiID: string;
  length: number;
}

export class Movie extends Model<MovieAttributes> {
  public id!: number;
  public title!: string;
  public imdbApiID!: string;
  public length!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imdbApiID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "movie",
  }
);
