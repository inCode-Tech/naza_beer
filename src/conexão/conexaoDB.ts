import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const conexaoDB = new Sequelize(process.env.DATABASE_URL);
