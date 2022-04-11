import React, { useState } from 'react';



function App() {

  const [equation, setEquation] = useState("0");
  const [answer, setAnswer] = useState("0");
  
  // try mathjs

  const addToEquation = (char) => {

    const signs = ["/", "*", "-", "+"]

    setEquation(equation + char)
  }

  return (
    <div className="App">
      <div id="calculator">
        <div id="display">
          <div id="display-text">
            {equation}
          </div>
        </div>

        <div id="buttons">
          <div id="main-buttons">
            <div className="button" id="clear">AC</div>
            <div className="button" id="divide">/</div>
            <div className="button" id="multiply">*</div>

            <div className="button" id="seven">7</div>
            <div className="button" id="eight">8</div>
            <div className="button" id="nine">9</div>

            <div className="button" id="four">4</div>
            <div className="button" id="five">5</div>
            <div className="button" id="six">6</div>

            <div className="button" id="one">1</div>
            <div className="button" id="two">2</div>
            <div onClick={() => {addToEquation("3")}} className="button" id="three">3</div>

            <div className="button" id="zero">0</div>
            <div className="button" id="decimal">.</div>
          </div>

          <div id="right-buttons">
            <div className="button" id="subtract">-</div>
            <div className="button" id="add">+</div>
            <div className="button" id="equals">=</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
