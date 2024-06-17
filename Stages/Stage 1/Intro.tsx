import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import React from 'react';
import './Intro.css';
import SlidingCircle from './CircleSlide';
import GlobalState from '../Global';



let SetFinalOutside;
let SetSlidingOutside;
let setVisibleOutside;
let FormName;

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
  const [FinalClass, setFinalClass] = useState("")
  const [isTyping, setIsTyping] = useState(false);
  const [Instruction, setInstruction] = useState("Meet your match")
  const [visible, setVisible] = useState(true);
  const [showSlidingCircle, setShowSlidingCircle] = useState(false);
  const typingTimeout = useRef<number | null>(null);
  FormName = useRef();

  setVisibleOutside = setVisible;
  SetFinalOutside = setFinalClass;
  SetSlidingOutside = setShowSlidingCircle;

  //BORF = Sphere
  //DAVID = Cylinder
  //JIAAN = Heptagon
  //MING = Pyramid
  //AZRY = Sphere
  //NICO = Egg
  //GASPAR = Cube
  //RENAE = 12 sided dice
  //CRIS = Icosahedron
  //Sarah = 12 sided dice
  //Maida = Icosahedron




  const [formData, setFormData] = useState({
    name: ""
  });

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
      setIsTyping(false);
      setTimeout(() => {
        setInstruction(Instruction === "Meet your match" ? "Swipe!" : "Meet your match")
        setVisible(true);
      }, 1000);
      setVisible(false);
      setShowSlidingCircle(true);

    }, 2000);
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



      <div className="heading-container" style={{ paddingBottom: '75px' }}>
        <h1 className={`fade ${!visible ? 'fade-hidden' : ''} heading ${FinalClass}`} >{Instruction}</h1>
        <h1 className={`backtext fade ${!visible ? 'fade-hidden' : ''} heading ${FinalClass}`} >{Instruction}</h1>
      </div>


      <div className="cube-container">
      <div id={FinalClass} className={`heart ${isHovered ? 'hovered' : ''} `}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}>
          <div className={`front ${FinalClass}`} style={{ transform: `translateZ(${max}px)` }}>
            <form ref={FormName} autoComplete='off' onSubmit={handleSubmit}>
              <div className="form-container">
              </div>
              <div className="form-element" style={{ paddingTop: '100px', paddingBottom: "100px" }} >
                <label htmlFor="name">What's your name?</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

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
  SetFinalOutside("final-cube-transition")
  SetSlidingOutside(false)
  setVisibleOutside(false);
}

export { Intro, Final };
