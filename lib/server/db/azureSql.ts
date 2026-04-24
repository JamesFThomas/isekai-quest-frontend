// read db string from .env.local
import sql from 'mssql';



export const getDbConnection = async () => {
  // DB connection string
  const connectionString = process.env.DATABASE_URL;
  
  // connection string validation 
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  
  // connect to db 
  try {
    const pool = await sql.connect(connectionString);
    return pool;
  } catch (err) {
    console.error('Error connecting to Azure SQL Database:', err);
    throw err;
  }
};
