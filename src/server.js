'use strict';
// importo dialogflow
const {WebhookClient} = require('dialogflow-fulfillment');
// importo express e altre cose
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// importo il modulo handlers con dentro le funzioni per gli intent
const handlers = require('../src/api/handlers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function Webhook(req, res) {
  const agent = new WebhookClient({request: req, response: res});
  console.log("asdf");
  console.log('----------------------')
  const action = agent.action;
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', handlers.welcomeHandler);
  intentMap.set('Default Fallback Intent', handlers.fallbackHandler);
  agent.handleRequest(intentMap);
}

// root del server
app.post('/', function (req, res) {
  console.log("asdf");
  // passo la richiesta alla funzione webhook
  Webhook(req, res);
});
// server in ascolto sulla porta 8080
app.listen(8080, function () {
  console.log("listening on port 8080")
});