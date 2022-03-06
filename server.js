const express = require('express');
const app = express();

const args = require("minimist")(process.argv.slice(2));
args["port"];
const port = args.port || process.env.PORT || 5000;
//var port = 5000;

const server = app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

app.get('/app', (req, res) => {
    res.status(200).end('200 OK');
    res.type("text/plain");
});

function coinFlip() {
    let random = Math.random();
    if (random > 0.5) {
      return "heads";
    } else {
      return "tails";
    }
    process.exit(1);
};

function coinFlips(flips) {
    const coins = [];
    for (let i = flips; i > 0; i--) {
      coins[flips-i] = coinFlip();
    }
    return coins;
    process.exit(1);
};

function countFlips(array) {
    let heads = 0;
    let tails = 0;
    for (let i = array.length; i > 0; i--) {
      if (array[array.length-i] == "heads") {
        heads += 1;
      } else {
        tails += 1;
      }
    }
    if (heads == 0) {
      return {tails: tails};
    } else if (tails == 0) {
      return {heads: heads};
    } else {
      return {heads: heads, tails: tails};
    }
    process.exit(1);
};

function flipACoin(call) {
    let flip = coinFlip();
    let result;
    if (call == flip) {
      result = "win";
    } else {
      result = "lose";
    }
    return {call: call, flip: flip, result: result};
    process.exit(1);
};

app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip': coinFlip() });
    res.type("text/plain");
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    res.status(200).json({ 'raw': flips, 'summary': countFlips(flips) })
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json( flipACoin("heads") );
    res.type("text/plain");
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json( flipACoin("tails") );
    res.type("text/plain");
});

app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND');
});

// app.use(function(req, res) {
//     res.status(404).send("Endpoint does not exist");
//     res.type("text/plain");
// });