// Serveur HTTP Node / Endpoint #127
const http = require('http');

function handler_127(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 127, status: 'ok', message: 'Reponse API #127' }));
}
module.exports = { handler_127 };
