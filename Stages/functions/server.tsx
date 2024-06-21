// src/functions/server.ts
import express from 'express';
import serverless from 'serverless-http';
import { generateColors, getUserColors } from './colorsController';

const app = express();

app.use(express.json()); // To support JSON-encoded bodies

app.post('/api/generateColors', generateColors);
app.get('/api/userColors/:userId', getUserColors);

const handler = serverless(app);

export { handler };