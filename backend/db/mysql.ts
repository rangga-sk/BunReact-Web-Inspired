import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: Bun.env.DB_HOST_MYSQL,
  port: Number(Bun.env.DB_PORT_MYSQL),
  user: Bun.env.DB_USER_MYSQL,
  password: Bun.env.DB_PASS_MYSQL,
  database: Bun.env.DB_NAME_MYSQL,
  waitForConnections: true,
  connectionLimit: Number(Bun.env.MYSQL_CONNECTION_LIMIT),
  queueLimit: 0
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error('MySQL connection failed: ' + error);
  }
}