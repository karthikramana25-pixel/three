const mysql = require('mysql2/promise');

async function waitForMySQL() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PWD;
  const database = process.env.DB_DATABASE;

  while (true) {
    try {
      console.log("⏳ Checking MySQL readiness...");

      const conn = await mysql.createConnection({
        host, user, password, database
      });

      await conn.ping();
      console.log("✅ MySQL is ready!");
      await conn.end();
      break;

    } catch (err) {
      console.log(`❌ MySQL not ready: ${err.code}. Retrying in 3 sec...`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

module.exports = waitForMySQL;

