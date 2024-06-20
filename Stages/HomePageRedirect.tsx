// src/components/HomePageRedirect.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const HomePageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const generateColors = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/generateColors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          navigate(`/user/${userId}`, { replace: true });
        } else {
          throw new Error('Failed to generate colors');
        }
      } catch (error) {
        console.error('Error generating colors:', error);
      }
    };

    const userId = uuidv4();  // Generate a unique user ID
    generateColors(userId);
  }, [navigate]);

  return null;  // This component doesn't render anything
};

export default HomePageRedirect;
