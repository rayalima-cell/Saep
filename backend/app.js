const express = require('express');
const cors = require('cors')
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());
