import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: "sabir",
  host: "localhost",
  database: "reservationdb",
  password: process.env.DB_PW,
  port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
