// src/functions/server.ts
import express from 'express';
import serverless from 'serverless-http';
import { generateColors, getUserColors } from './controllers/colorsController.js';

const app = express();

app.get('/api/generateColors', (req, res) => {
  generateColors();
});

app.get('/api/userColors/:userId', (req, res) => {
  const userId = req.params.userId;
  getUserColors();
});

module.exports.handler = serverless(app);