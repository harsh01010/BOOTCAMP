import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1); // all starting with use is called hook in react
  const [isOpen, setIsOpen] = useState(true);
  function incr() {
    if (step < 3) setStep((s) => s + 1);
  }
  function dcer() {
    if (step > 1) setStep((s) => s - 1);
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen((s) => !s)}></button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step === 1 ? "active" : ""}`}>1</div>
            <div className={`${step === 2 ? "active" : ""}`}>2</div>
            <div className={`${step === 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            Step {step}:{messages.at(step - 1)}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={dcer}
            >
              previous
            </button>

            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={incr}
            >
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/*
what is state and why do we need it?

data that a component can hold over time.that it needs to remember throughout the app's lifecycle.
Component's memory.
updating component state triggers react to re-render the component
state allows us to update the component's view.
persist local variables between renders.

React Reacts to state changes by re rendering the ui, that's why it is named react😏
Each component has and manages its own state,no matter how many times we render the same component.
UI as a function of state

*/
