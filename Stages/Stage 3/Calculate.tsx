import React, { useState, useEffect, Component, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalData } from '../global';
import './Calculate.css'

let Data;
let SetInfoOutside;
let InfoOutside;
let SetGradientColorOutside;
let SetAnimClassOutside;
let SetVisibleOutside;
let x = 0;
let y = 0;
let check = false;
let Finished = false;
let current = 0;
let scaledec = 1
let CompatibilityMax = Math.floor(Math.random() * (Math.floor(90) - Math.ceil(65)) + Math.ceil(65));
let SetCompatibilityOutside;

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const TextLines = [
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
  if (x < TextLines.length && InfoOutside == displayText && check == false) {
    check = true;
    x++;
    console.log(true)
    setTimeout(() => {
      SetInfoOutside(TextLines[x - 1])
      check = false
      console.log(TextLines[x - 1])
      if (x == 3) {
        console.log("Color Check")
        SetGradientColorOutside(Data.Color)
      }

    }, 2000);
  }
  return displayText;
};
function PercentageChange(speeds) {
  const [percentage, setPercentage] = useState(0);

  let min;
  let max;
  let minCeiled
  let maxFloored
  let compatible

  SetCompatibilityOutside = setPercentage;
  console.log(CompatibilityMax)
  useEffect(() => {
    const randomInterval = setInterval(() => {
      if (current < CompatibilityMax) {
        max = current + 5;
        min = current - 2;
        if (min < 0) {
          min = 5
        }
        minCeiled = Math.ceil(min);
        maxFloored = Math.floor(max);

        current = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
        setPercentage(current);
      } else {
        max = current;
        min = current - 20;
        minCeiled = Math.ceil(min);
        maxFloored = Math.floor(max);

        current = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
        setPercentage(current);
      }
    }, speeds);
    setTimeout(() => {
      Finished = true;
      SetAnimClassOutside("final-anim")
      SetVisibleOutside(true)
      clearInterval(randomInterval);
    }, 20000);
  }, [speeds])
  return percentage
}

function Calculate() {
  const { globalData, setData } = useGlobalData();
  const [info, setInfo] = useState("Let's see...");
  const [gradientColor, setGradientColor] = useState("#fff");
  const [animClass, setAnimClass] = useState('percentage-anim')
  const [visible, setVisible] = useState(false);
  const [Instruction, setInstruction] = useState("Double click to give it a boost")

  const [waitingClick, setWaitingClick] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [lastClick, setLastClick] = useState(0);

  Data = globalData;
  SetInfoOutside = setInfo;
  InfoOutside = info;
  SetGradientColorOutside = setGradientColor;
  SetAnimClassOutside = setAnimClass;
  SetVisibleOutside = setVisible
  const navigate = useNavigate();

  const displayText = useTypewriter(info, 50);
  const percentage = PercentageChange(200);

  useEffect(() => {
    if (Data.UserName == "" || Data.MatchName == "" || Data.Color == "") {
      navigate("/")
    }
  });
  const DoubleClick = () => {
    if (y < 5 && Finished == true) {
      if (y==0) {
        setVisible(false)
        setTimeout(() => {
          setInstruction("Keep going!")
          setVisible(true)
        }, 1000);

      }
      y++;
      scaledec += y * 0.1;
      current += Math.floor(Math.random() * (Math.floor(y) - Math.ceil(1)) + Math.ceil(1));
      SetCompatibilityOutside(current);
    } else if (y == 5) {
      setVisible(false)
      console.log(visible);
      current += Math.floor(Math.random() * (Math.floor(y) - Math.ceil(1)) + Math.ceil(1));
      SetCompatibilityOutside(current);
      scaledec = 0;
      setTimeout(() => {
        setVisible(true)
        setInstruction("Share your link with your partner!")
      }, 1000);

      setInfo("Congrats! you have a score of " + current + "%")
    }
  }
  const processClick = (e) => {
    if (lastClick && e.timeStamp - lastClick < 250) {
      // Double tap detected
      setLastClick(0);
      if (waitingClick) {
        clearTimeout(waitingClick);
      }
      DoubleClick();
      setWaitingClick(null);
    } else {
      // Single tap detected
      setLastClick(e.timeStamp);
      const timeout = setTimeout(() => {
        setWaitingClick(null);
        console.log("Do the steps to respond single click");
        // You can add the single click action here if needed
      }, 250);
      setWaitingClick(timeout);
    }
  }
  return (
    <div>
      <div className="heading-container text-inst">
        <h1 className={` fade ${!visible ? 'fade-hidden' : ''} heading`} >{Instruction}</h1>
        <h1 className={` backtext fade ${!visible ? 'fade-hidden' : ''} heading`} >{Instruction}</h1>
      </div>
      <div className='container' onClick={(e) => processClick(e)}>
        <h5 >{`${displayText}`}</h5 >
        <div className="load-wrapp">
          <div className="load-9">
            <div className="spinner">
              <div className="bubble-1" style={{ backgroundColor: `${gradientColor}` }}></div>
              <div className="bubble-2" style={{ backgroundColor: `${gradientColor}` }}></div>
              <div className="bubble-3" style={{ backgroundColor: `${gradientColor}` }}></div>
            </div>
            <div className={`${animClass} percentage`}>
              <h3 style={{ scale: `${scaledec}` }}>{`${percentage}`}%</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculate;