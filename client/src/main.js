// collect users data, send to server
// - add interactivity to data collection elements (event)
// - ensure evt hndlr fetches server route that creates in DB
// -   fetch("url", { method: POST, headers: { ... }, body: ... })
// create DOM ele to render data
// - make sure you use DOM manipulation methods, avoid excessive .innerHTML
//! during dev, fetch localhost; once deploying, swap localhost URLs with server deploy url
//http://localhost:8080/staff --> dev
//https://deployedwebsiteurl.onrender.com/staff --> production

//import dotenv from "dotenv";
//dotenv.config();

const log = console.log;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const test = document.getElementById("test");
test.addEventListener("submit", handleSubmitTest);

async function handleSubmitTest(ev) {
  ev.preventDefault();
  const testData = new FormData(test);
  const msg = testData.get("testMessage"); // o = Object.fromEntries(testData);
  let rsp = await fetch(SERVER_URL + "postTest", {
    method: "POST", // This is where we set the POST HTTP verb
    headers: {
      "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
    },
    body: JSON.stringify({ msg }),
  });
  log(rsp.status); // Expected: 200
  // No neeed to await the response body, though I do worry as the server returns
  // synchronously then we could be doing the GET before the data arrives in the DB
  rsp = await fetch(SERVER_URL + "getTest");
  const rspData = await rsp.json();
  log(rspData.testmessage); // Expected: Your first message since last DB reseed, returned to you
}

// Get all the comments from the database
async function retrieveComments() {
  return await (await fetch(SERVER_URL + "guest-messages")).json();
}

// Create the DOM elements to hold the existing comments, and fill them
async function populatePage() {
  for (comment in await retrieveComments()) {
    //= document.createElement();
    // create children & set their properties from the data
    // append the children ...
  }
}
