// Serveur HTTP Node / Endpoint #85
const http = require('http');

function handler_85(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 85, status: 'ok', message: 'Reponse API #85' }));
}
module.exports = { handler_85 };
