import React, { useState, useEffect, Component, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalData } from '../global';
import './Calculate.css'

let Data;
let SetInfoOutside;
let InfoOutside;
let x= 0;
let SetGradientColorOutside;
const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
  

    const TextLines= [
      "Your name is " + Data.UserName + "...",
      "And we are talking about " + Data.MatchName + "...",
      "Ooooh and you picked " + Data.Color + "...",
      "That's all I needed...",
      "Let me do my magic..."
  ]
  
    useEffect(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
  
      return () => {
        clearInterval(typingInterval);
      };
      
    }, [text, speed]);
    console.log(text)
    console.log(displayText)
    if (x < TextLines.length && InfoOutside == displayText){
      x++;
      console.log(true)
      setTimeout(() => {
        SetInfoOutside(TextLines[x-1])
        console.log(TextLines[x-1])
        if (x == 3) {
          console.log("Color Check")
          SetGradientColorOutside(Data.Color)
        }
      }, 2000);
    }
    return displayText;
  };

function Calculate() {
    const { globalData, setData } = useGlobalData();
    const [info, setInfo] = useState("Let's see...");
    const [gradientColor, setGradientColor] = useState("#fff");

    Data = globalData;
    SetInfoOutside = setInfo;
    InfoOutside = info
    SetGradientColorOutside = setGradientColor;
    const navigate = useNavigate();
    const displayText = useTypewriter(info, 50);

    useEffect(() => {
    if (Data.UserName == "" || Data.MatchName == "" || Data.Color == "") {
      navigate("/")
    }
  })
    return (
        <div className='container'>
            <h5 >{`${displayText}`}</h5 >
            <div className="load-wrapp">
                <div className="load-9">
                    <div className="spinner">
                        <div className="bubble-1" style={{ backgroundColor: `${gradientColor}`}}></div>
                        <div className="bubble-2" style={{ backgroundColor: `${gradientColor}`}}></div>
                        <div className="bubble-3" style={{ backgroundColor: `${gradientColor}`}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculate;