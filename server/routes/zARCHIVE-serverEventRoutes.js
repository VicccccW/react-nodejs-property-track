const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');

let clients = [];
let messages = [];

const eventHandler = (req, res, next) => {

  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);

  // After client opens connection send all event message as string
  const data = `data: ${JSON.stringify(messages)}\n\n`;
  res.write(data);

  // Generate an id based on timestamp and 
  // save res object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(c => c.id !== clientId);
  });
}

// GET request to this route, establish the connection to frontend
router.get('/', eventHandler);

module.exports = router;