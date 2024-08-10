// Serveur HTTP Node / Endpoint #96
const http = require('http');

function handler_96(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 96, status: 'ok', message: 'Reponse API #96' }));
}
module.exports = { handler_96 };
