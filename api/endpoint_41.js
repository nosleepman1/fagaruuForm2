// Serveur HTTP Node / Endpoint #41
const http = require('http');

function handler_41(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 41, status: 'ok', message: 'Reponse API #41' }));
}
module.exports = { handler_41 };
