// read db string from .env.local
import sql from 'mssql';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export const getDbConnection = async () => {
  try {
    const pool = await sql.connect(connectionString);
    return pool;
  } catch (err) {
    console.error('Error connecting to Azure SQL Database:', err);
    throw err;
  }
};
