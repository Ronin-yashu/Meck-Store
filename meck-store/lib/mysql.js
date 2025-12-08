import mysql from 'mysql2/promise';

if (!process.env.MYSQL_HOST) {
  throw new Error('MYSQL_HOST is not defined in environment variables');
}

if (!process.env.MYSQL_DATABASE) {
  throw new Error('MYSQL_DATABASE is not defined in environment variables');
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected Successfully');
    console.log(`   Database: ${process.env.MYSQL_DATABASE}`);
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL Connection Error:');
    console.error('   Message:', err.message);
    console.error('   Code:', err.code);
    if (err.code === 'ECONNREFUSED') {
      console.error('   Make sure MySQL server is running');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Check your MySQL username and password');
    }
  });

export default pool;