// Serveur HTTP Node / Endpoint #71
const http = require('http');

function handler_71(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 71, status: 'ok', message: 'Reponse API #71' }));
}
module.exports = { handler_71 };
