// server/app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateColors, getUserColors } from '../.netlify/functions/controllers/colorsController.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Endpoint to generate and store colors
app.post('/api/generateColors', generateColors);
// Endpoint to retrieve colors for a user
app.get('/api/userColors/:userId', getUserColors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});