// Serveur HTTP Node / Endpoint #78
const http = require('http');

function handler_78(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 78, status: 'ok', message: 'Reponse API #78' }));
}
module.exports = { handler_78 };
