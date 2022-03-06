const express = require('express');
const app = express();

const args = require("minimist")(process.argv.slice(2));
args["port"];
const port = args.port || process.env.PORT || 5000;
//var port = 5000;

const server = app.listen(port, () => {
    console.log(`App is running on ${port}`);
})

app.get('/app', (req, res) => {
    res.status(200).end('200 OK');
    res.type("text/plain");
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({ 'message': req.params.number })
})

function coinFlip() {
    let random = Math.random();
    if (random > 0.5) {
      return "heads";
    } else {
      return "tails";
    }
    process.exit(1);
  }

function coinFlips(flips) {
    const coins = [];
    for (let i = flips; i > 0; i--) {
      coins[flips-i] = coinFlip();
    }
    return coins;
    process.exit(1);
}

app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip': coinFlip() });
    res.type("text/plain");
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist");
    res.type("text/plain");
}) 