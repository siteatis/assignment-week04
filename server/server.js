import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Init dotenv

const log = console.log;
const port = 8080; // Note: didn't need (require("https")).createServer(...).listen(443) in the end

// Connect to DB (trxn pool) using the conn string in the env vars
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
}); // log(db);

const app = express();
app.use(cors()); // Allow resources to come from elsewhere for processing
app.use(express.json()); // Use middleware that turns JSON into a body for HTTP POST
app.listen(port); // Bind the port // () => log(`<Listening on :${port}>...`));

// Create the root route (http://localhost:8080) where client can GET data
// In deployment, it'll be http://wherever:8080 (use client env vars)
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

// Return the entire comments database. Hmm, that's already a problem. If the user posts
// a new comment then it's going to be a bit over-the-top to just append it to the DB
// and then reread the entire DB which could be massive! We need to have some kind of view
// of the table at the client end, with the changes we make there to be reflected in the
// DB via middleware. But how to do such a thing? And this is just the very first thing I'm
// writing for the actual guestbook, and already big questions are coming up!
const qryGetComments = `SELECT * FROM comments`;
app.get("/get-comments", async (req, rsp) =>
  rsp.json((await db.query(qryGetComments)).rows)
);
