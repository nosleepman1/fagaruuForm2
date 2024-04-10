// Serveur HTTP Node / Endpoint #43
const http = require('http');

function handler_43(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 43, status: 'ok', message: 'Reponse API #43' }));
}
module.exports = { handler_43 };
