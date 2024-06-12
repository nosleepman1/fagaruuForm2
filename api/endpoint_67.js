// Serveur HTTP Node / Endpoint #67
const http = require('http');

function handler_67(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 67, status: 'ok', message: 'Reponse API #67' }));
}
module.exports = { handler_67 };
