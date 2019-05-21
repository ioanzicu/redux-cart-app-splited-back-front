const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const phones = require("./phones");

const app = express();

// if (process.env.NODE_ENV === "production") {
app.use(express.static("public"));
app.use(express.static("react-cart-app/build"));
app.use(cors());

app.get("/", (req, res) => {
  const help = `
  <pre>
    Welcome to the Phone Store API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /phones
  </pre>
  `;
  res.send(help);
});

app.use((req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)"
    });
  }
});

app.get("/phones", (req, res) => {
  res.send(phones.get(req.token));
});
// }

app.listen(config.port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", config.port);
});
