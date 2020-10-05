const express = require("express");
const server = express();
server.use(express.json());

const AccountsRouter = require('../accounts/accounts-router.js');
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
  res.status(200).json( {message: 'Server Running Sanity Check...' });
})

module.exports = server;
