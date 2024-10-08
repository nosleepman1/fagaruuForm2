// Serveur HTTP Node / Endpoint #122
const http = require('http');

function handler_122(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 122, status: 'ok', message: 'Reponse API #122' }));
}
module.exports = { handler_122 };
