// Serveur HTTP Node / Endpoint #72
const http = require('http');

function handler_72(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 72, status: 'ok', message: 'Reponse API #72' }));
}
module.exports = { handler_72 };
