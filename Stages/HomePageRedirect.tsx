// src/components/HomePageRedirect.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalData } from './global';

const HomePageRedirect = () => {
  const navigate = useNavigate();
  const { globalData, setData } = useGlobalData();

  useEffect(() => {
    const generateColors = async (userId) => {
      try {
        const response = await fetch(`/api/generateColors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          navigate(`/match/${userId}`, { replace: true });
        } else {
          throw new Error('Failed to generate colors');
        }
      } catch (error) {
        console.error('Error generating colors:', error);
      }
    };

    const userId = uuidv4();  // Generate a unique user ID
    setData("","","")
    generateColors(userId);
  }, [navigate]);

  return null;  // This component doesn't render anything
};

export default HomePageRedirect;
