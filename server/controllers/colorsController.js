// server/controllers/colorsController.js

import { v4 as uuidv4 } from 'uuid';

// In-memory storage for demonstration purposes
let userColors = {};

// Function to generate a random hex color
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate an array of 4 random colors
const generateRandomColors = () => {
  let colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

// Controller function to handle generating and storing colors
export const generateColors = (req, res) => {
  const { userId } = req.body;

  // Generate 4 random colors
  const colors = generateRandomColors();

  // Store the colors in the in-memory storage
  userColors[userId] = colors;

  res.json({ success: true });
};

// Controller function to handle retrieving colors for a user
export const getUserColors = (req, res) => {
  const { userId } = req.params;

  // Retrieve the colors from the in-memory storage
  const colors = userColors[userId];

  if (colors) {
    res.json(colors);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
