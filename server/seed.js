import pg from "pg";
import dotenv from "dotenv";
dotenv.config(); // Init dotenv
const log = console.log;
// Connect to DB (trxn pool) using the conn string in the env vars
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
}); // log(db);

// Has to be async to chain them otherwise the queries execute out of order
// and I get errors saying the table doesn't exist yet
async function doSeeding() {
  for (let q of [
    `DROP TABLE IF EXISTS test, comments`,
    `CREATE TABLE test (testmessage TEXT)`,
    `CREATE TABLE comments (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255), relation VARCHAR(255), content TEXT)`,
    `INSERT INTO test VALUES ('DUMMY')`,
    `INSERT INTO comments (name,relation,content)
            VALUES ('Santa', 'My elves found you', 'Merry Xmas!')`,
    `INSERT INTO comments (name,relation,content)
            VALUES ('Satan', 'I already live here', 'Grotty Xmas!')`,
    `INSERT INTO comments (name,relation,content)
            VALUES ('Bart Simpson', 'I sent Milhouse ahead', 'Eat my shorts!')`,
    `INSERT INTO comments (name,relation,content)
            VALUES ('Cicero', 'Lorem Ipsum, my dear fellow', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nulla ex. Aenean fringilla egestas finibus. Morbi consectetur ligula ut tellus tempor accumsan. Pellentesque id metus faucibus, porttitor felis id, dignissim nisi. Maecenas tempus laoreet ultrices. Vivamus non ante ut tortor finibus bibendum nec quis dolor. Donec faucibus eros sit.')`,
  ])
    await db.query(q);
  console.log("Seed data created successfully!");
}
doSeeding();
