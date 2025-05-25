import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Init dotenv

const log = console.log;
const port = 8080; // TODO: prod is https so ?? (require("https")).createServer(/**/, app).listen(443~8080);

// Connect to DB (trxn pool) using the conn string in the env vars
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
}); // log(db);

const app = express();
app.use(cors()); // Allow resources to come from elsewhere for processing
app.use(express.json()); // Use middleware that turns JSON into a body for HTTP POST
app.listen(port); // Bind the port // () => log(`<Listening on :${port}>...`));

// Create the root route (http://localhost:8080) where client can GET data
// In deployment, it'd be http://wherever:8080. // TODO: Or 443? How to connect to https?
app.get("/", (req, rsp) => {
  rsp.send(
    `<h3 style="text-align:center">Apologies, dear visitor, but there is no website here.</h3>`
  );
});

const qryStrG = `SELECT * FROM test`;
app.get(
  "/getTest",
  async (req, rsp) => rsp.json((await db.query(qryStrG)).rows[1]) // Because Row 0 is our DUMMY seed entry
);

const qryStrP = `INSERT INTO test (testmessage) VALUES ($1)`;
app.post("/postTest", (req, rsp) => {
  const b = req.body;
  rsp.json(
    db.query(qryStrP, [b.msg])
    // Note not async, as we're only launching it into the pool, we aren't telling
    // the client whether it succeeded or not. Manny says in future we'll have a try-catch
    // (but then surely that means resolving the promise, which blocks?)
  );
});
