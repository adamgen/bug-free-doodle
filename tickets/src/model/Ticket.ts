import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/sequelize";

interface TicketAttributes {
  id: string;
  movieId: string;
  availableTickets: number;
  ticketsLeft: number;
  dateAndTIme: Date;
  price: number;
}

export class Ticket extends Model<TicketAttributes> {
  public id!: number;
  public movieId!: string;
  public availableTickets!: number;
  public ticketsLeft!: number;
  public dateAndTIme!: Date;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketsLeft: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "ticket",
  }
);
