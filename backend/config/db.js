import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool();

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_todo (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);
    console.log("✅ Table user_todo is ready");
  } catch (err) {
    console.error("❌ Failed to create table", err);
  }
};

initDB();

export default pool;
