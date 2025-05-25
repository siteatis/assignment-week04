// collect users data, send to server
// - add interactivity to data collection elements (event)
// - ensure evt hndlr fetches server route that creates in DB
// -   fetch("url", { method: POST, headers: { ... }, body: ... })
// create DOM ele to render data
// - make sure you use DOM manipulation methods, avoid excessive .innerHTML
//! during dev, fetch localhost; once deploying, swap localhost URLs with server deploy url

import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
