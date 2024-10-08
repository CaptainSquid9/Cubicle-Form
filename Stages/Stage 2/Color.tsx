import React, { useState, useEffect, Component } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {useGlobalData} from '../global'
import './Color.css'


function Fun() {

const { id } = useParams();
const [colors, setColors] = useState([]);
const [visible, setVisible] = useState(true);
//double tap
const [waitingClick, setWaitingClick] = useState<ReturnType<typeof setTimeout> | null>(null);
const [lastClick, setLastClick] = useState(0);
//sector visibility
const [Instruction, setInstruction] = useState("Pick your favorite color")
const [scaledSectors, setScaledSectors] =  useState<boolean[]>(new Array(4).fill(false)); // State to track scaled sectors
const [InvSectors, setInvSectors] =  useState<boolean[]>(new Array(4).fill(false)); // State to track scaled sectors
const { globalData, setData } = useGlobalData();

const navigate = useNavigate();

  useEffect(() => {
      if (globalData.UserName == "" || globalData.MatchName == "") {
        navigate("/")
      }
    const fetchUserColors = async (userId) => {
      try {
        const response = await fetch(`/api/userColors/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setColors(data);
        } else {
          throw new Error('Failed to fetch user colors');
        }
      } catch (error) {
        console.error('Error fetching user colors:', error);
        navigate("/");
      }
    };

    fetchUserColors(id);
  }, [id]);


  const ClickColor = (i: number) => {
    const newScaledSectors = colors.map((_, index) => index !== i); // Track which sectors should be scaled
    setScaledSectors(newScaledSectors);
    if (Instruction != "Double Click!") {
    setTimeout(() => {
      setInstruction("Double Click!")
      setVisible(true);
    }, 1000);
    setVisible(false);
  }
  };
  const DoubleClick = (i, color) => {
    setData(undefined,undefined,color);
    console.log(color)
    const newScaledSectors = colors.map((_, index) => index !== i); // Track which sectors should be scaled
    console.log(newScaledSectors)
    setInvSectors(newScaledSectors);
    setTimeout(() => {
      const allSectors = new Array(4).fill(true)
      setInvSectors(allSectors);
      setVisible(false);
    }, 2000);
    setTimeout(() => {
      navigate('./loading');
    }, 4000);
  }



  // Double tap (mobile) detect
  const processClick = (e, i, color) => {
    if (lastClick && e.timeStamp - lastClick < 500) {
      // Double tap detected
      setLastClick(0);
      if (waitingClick) {
        clearTimeout(waitingClick);
      }
      DoubleClick(i, color);
      setWaitingClick(null);
    } else {
      // Single tap detected
      setLastClick(e.timeStamp);
      const timeout = setTimeout(() => {
        setWaitingClick(null);
        // You can add the single click action here if needed
      }, 500);
      setWaitingClick(timeout);
    }
  };

    return (
        <div>
        <div className="heading-container">
            <h1 className={`fade ${!visible ? 'fade-hidden' : ''} heading`} >{Instruction}</h1>
            <h1 className={`backtext fade ${!visible ? 'fade-hidden' : ''} heading`} >{Instruction}</h1>
        </div>
        <div className='world'>
            <div id="colorWheel">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`sector sector-${index + 1} ${scaledSectors[index] ? 'scaled' : ''} ${InvSectors[index] ? 'inv' : ''}`}
                    style={{ background: `linear-gradient(45deg, ${color} 35%, white`}}
                    onMouseEnter={() => ClickColor(index)}
                    onMouseLeave={() =>setScaledSectors(new Array(9).fill(false))}
                    onClick={(e)=>processClick(e,index, color)}
                ></div>
            ))}
            </div>
            <div id="colorWheel" className='cw-shadow'>
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`sector sectorb-${index + 1} ${InvSectors[index] ? 'inv' : ''}`}
                    style={{ background: `linear-gradient(45deg, ${color} 35%, white`}}
                ></div>
            ))}
            </div>
        </div>
        </div>
    )
}
export default Fun;