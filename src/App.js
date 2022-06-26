import React, { useState } from 'react';
// @ts-ignore
import { evaluate, round } from 'mathjs/number';


function App() {

  const [equation, setEquation] = useState("0");
  const [display, setDisplay] = useState("0")

  const addToEquation = (e) => {
    let newEquation = equation;
    let newChar = e.target.innerHTML;
    const prevChar = equation[equation.length - 1]
    const signs = ["+", "/", "*"];
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (newEquation.includes("=")){
      newEquation = newEquation.slice(newEquation.lastIndexOf(" "))
      if (nums.includes(newChar)) newEquation = "";
    }

    if (newChar === "AC") {
      setEquation("0");
      setDisplay("0");
      return;
    }

    if (newEquation.length > 60) return setDisplay("Character limit exceeded.")

    if (equation === "0") newEquation = "";

    // handle special characters

    if (signs.includes(newChar)){
      if (equation === "0") return;
      if (prevChar === " ") newEquation = newEquation.slice(0, newEquation.length - 3);
      if (prevChar === "-") newEquation = newEquation.slice(0, newEquation.length - 4);
      if (prevChar === ".") newEquation = newEquation.slice(0, newEquation.length - 1);
      newChar = " " + newChar + " ";
    }

    if (newChar === "."){
      if (prevChar === ".") return;
      // return if current num already contains a decimal
      for (let i = equation.length - 1; i >= 0; i--){
        if (equation[i] === " ") break;
        if (equation[i] === ".") return;
      }
    }

    if (newChar === "-"){
      // if prevChar is a decimal, replace the decimal
      if (prevChar === ".") {
        newEquation = newEquation.slice(0, newEquation.length - 1);
        newChar = " " + newChar + " ";
      }  

      // if prevChar is a minus sign (and not a space), it's a redundant call, so just return
      if (prevChar === "-") return;
      
      // if prevChar is a number, treat it as an operator: append spaces
      if (equation !== "0" && nums.includes(prevChar)) newChar = " " + newChar + " ";
    }

    newEquation += newChar;
    setEquation(newEquation);

    // show current num or sign in display
    if (newChar[0] === " ") {
      setDisplay(newChar)
    } else {
      setDisplay(newEquation.slice(newEquation.lastIndexOf(" ") + 1))
    }
  }

  const evalEquation = () => {
    const prevChar = equation[equation.length - 1]
    let newEquation = equation;
    if (prevChar === " ") newEquation = newEquation.slice(0, newEquation.length - 3);
    if (prevChar === ".") newEquation = newEquation.slice(0, newEquation.length - 1);
    if (prevChar === "-") newEquation = newEquation.slice(0, newEquation.length - 4);
    
    let ans = round(evaluate(newEquation), 6).toString();
    
    setEquation(newEquation + " = " + ans)
    setDisplay(ans);
  }

  return (
    <div className="App">
      <div id="calculator">
        <div id="display-container">
          <div id="equation">
            {equation}
          </div>
          <div id="display">
            {display}
          </div>
        </div>

        <div id="buttons">
          <div id="main-buttons">
            <div onClick={addToEquation} className="button" id="clear">AC</div>
            <div onClick={addToEquation} className="button" id="divide">/</div>
            <div onClick={addToEquation} className="button" id="multiply">*</div>

            <div onClick={addToEquation} className="button" id="seven">7</div>
            <div onClick={addToEquation} className="button" id="eight">8</div>
            <div onClick={addToEquation} className="button" id="nine">9</div>

            <div onClick={addToEquation} className="button" id="four">4</div>
            <div onClick={addToEquation} className="button" id="five">5</div>
            <div onClick={addToEquation} className="button" id="six">6</div>

            <div onClick={addToEquation} className="button" id="one">1</div>
            <div onClick={addToEquation} className="button" id="two">2</div>
            <div onClick={addToEquation} className="button" id="three">3</div>

            <div onClick={addToEquation} className="button" id="zero">0</div>
            <div onClick={addToEquation} className="button" id="decimal">.</div>
          </div>

          <div id="right-buttons">
            <div onClick={addToEquation} className="button" id="subtract">-</div>
            <div onClick={addToEquation} className="button" id="add">+</div>
            <div onClick={evalEquation} className="button" id="equals">=</div>
          </div>

        </div>
      </div>

      <div id="footer">
        <a href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator" target="_blank">JavaScript Calculator FCC Project</a> <br /> by <a href="https://www.billybrowniii.com" target="_blank">Billy Brown III</a>
      </div>
    </div>
  );
}

export default App;
