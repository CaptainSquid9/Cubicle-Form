import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FunQ.css'


function Fun() {

const { id } = useParams();
const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchUserColors = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/userColors/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setColors(data);
        } else {
          throw new Error('Failed to fetch user colors');
        }
      } catch (error) {
        console.error('Error fetching user colors:', error);
      }
    };

    fetchUserColors(id);
  }, [id]);

    return (
        <div className='world'>
            <div id="colorWheel">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`sector sector-${index + 1}`}
                    style={{ backgroundColor: color}}
                ></div>
            ))}
            </div>
            <div className='cw-shadow'>
            </div>
        </div>
    )
}
export default Fun;