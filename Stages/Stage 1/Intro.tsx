import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import React from 'react';
import {useGlobalData} from '../global'
import SlidingCircle from './CircleSlide';
import { useNavigate } from 'react-router-dom';
import './Intro.css';


let SetFinalOutside;
let SetSlidingOutside;
let setVisibleOutside;
let SetQuestionOutside;
let SetResetOutside;
let SetFormDataOutside;
let SetShowSlidingOutside;
let setDataOutside;
let FormDataOutside;
let FormName;
let navigate;
let finali = 0;

type Layer = {
  className: string;
  transform: string;
};

const generateLayers = (numLayers: number, zIncrement: number): Layer[] => {
  const layers: Layer[] = [];
  for (let i = 0; i < numLayers; i++) {
    layers.push({
      className: `back`,
      transform: `translateZ(${i * zIncrement}px)`
    });
  }
  return layers;
};


function Intro() {
  
  const Nav = useNavigate();
  const [FinalClass, setFinalClass] = useState("")
  const [ResetClass, setResetClass] = useState("swing-label")
  const [isTyping, setIsTyping] = useState(false);
  const [Instruction, setInstruction] = useState("Compatibility Test")
  const [Question, setQuestion] = useState("What's your name?")
  const [visible, setVisible] = useState(true);
  const [showSlidingCircle, setShowSlidingCircle] = useState(false);
  const typingTimeout = useRef<number | null>(null);
  const [formData, setFormData] = useState({name: ""});
  const { globalData, setData } = useGlobalData();
  FormName = useRef();

  navigate = Nav;
  setVisibleOutside = setVisible;
  SetFinalOutside = setFinalClass;
  SetSlidingOutside = setShowSlidingCircle;
  SetQuestionOutside = setQuestion;
  SetResetOutside = setResetClass;
  SetFormDataOutside = setFormData; 
  setDataOutside = setData;
  SetShowSlidingOutside = setShowSlidingCircle;

  FormDataOutside = formData;


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setFormData({ ...formData, [name]: value });

    //Check if typing
    setIsTyping(true);
    setShowSlidingCircle(false);
    if (typingTimeout.current !== null) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = window.setTimeout(() => {
      setVisible(true);
      setIsTyping(false);
      setTimeout(() => {
        setInstruction(Instruction === "Compatibility Test" ? "Swipe right!" : "Swipe again!")
        setVisible(true);
      }, 1000);
      setVisible(false);
      setShowSlidingCircle(true);

    }, 1000);
  };


  //Start assigning shapes based on input
  //Name word count
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //Word check
    e.preventDefault();
    var WordCount = formData.name.trim().split(/\s+/).length
    console.log(WordCount);
    if (WordCount <= 1) {
    }
    else if (WordCount >= 3) {
    }
  };
  //hovering
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  const numLayers = 5;
  const zIncrement = 10;
  const max = numLayers * zIncrement; 
  const layers = generateLayers(numLayers, zIncrement);

  return (
    <div>
      {showSlidingCircle && <SlidingCircle />}



      <div className="heading-container">
        <h1 className={`fade ${!visible ? 'fade-hidden' : ''} headingI ${FinalClass}`} >{Instruction}</h1>
        <h1 className={`backtextI fade ${!visible ? 'fade-hidden' : ''} headingI ${FinalClass}`} >{Instruction}</h1>
      </div>


      <div className="cube-container">
      <div id={FinalClass} className={`heart ${isHovered ? 'hovered' : ''} `}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}>
          <div className={`front ${FinalClass}`} style={{ transform: `translateZ(${max}px)` }}>
            <form ref={FormName} autoComplete='off' onSubmit={handleSubmit}>
              <div className="form-container">
              </div>
              <div className="form-element" style={{ paddingTop: '50px', paddingBottom: "50px" }} >
              <span>
              <input 
                  maxLength={14}
                  className="swing"
                  type="text" 
                  placeholder=""                  
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required />
              <label htmlFor="name" className={`${ResetClass}`}>{`${Question}`}</label>
              </span>

              </div>

            </form>
          </div>
          {layers.map((layer, index) => (
          <div
          key={index}
          className={`${layer.className} ${FinalClass}`}
          style={{ transform: layer.transform }}
          >
        </div>
          ))}
          </div>
        </div>
      </div>
  )
}
function Final() {
  finali++;
  setVisibleOutside(false);
  if (finali == 2) {
    setDataOutside(undefined,FormDataOutside.name)
    SetFinalOutside("final-cube-transition")
    setTimeout(() => {
      navigate('./color');
    }, 2000);

  }
  else {
  setDataOutside(FormDataOutside.name)
  console.log("Final")
  SetFinalOutside("cube-transition")
  SetResetOutside("reset")
  setTimeout(() => {
    
    SetResetOutside("swing-label")
    SetQuestionOutside("What's their name?")
    SetFormDataOutside({name: ""});
  }, 500);
  setTimeout(() => {
    SetFinalOutside("")
    SetSlidingOutside(false)
   }, 2000);
    //setVisibleOutside(false);
  }
  SetShowSlidingOutside(false);
}

export { Intro, Final };
