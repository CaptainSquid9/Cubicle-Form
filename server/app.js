// server/app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateColors, getUserColors } from './controllers/colorsController.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Endpoint to generate and store colors
app.post('http://deluxe-cactus-6c7fb0.netlify.app:5000/api/generateColors', generateColors);

// Endpoint to retrieve colors for a user
app.get('http://deluxe-cactus-6c7fb0.netlify.app:5000/api/userColors/:userId', getUserColors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});