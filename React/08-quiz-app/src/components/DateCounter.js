import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + 1 };
    case "dec":
      return { ...state, count: state.count - 1 };
    case "defineCount":
      return { ...state, count: action.payload.count };
    case "defineStep":
      return { ...state, step: action.payload.step };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error("Invalid action type");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("feb 11 2024");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc" }); // this is called dispatching an action
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({
      type: "defineCount",
      payload: { count: Number(e.target.value), step: state.step },
    });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({
      type: "defineStep",
      payload: { count: state.step, step: Number(e.target.value) },
    });
  };

  const reset = function () {
    // setCount(0);
    //setStep(1);
    dispatch({
      type: "reset",
    });
  };

  //rather than using the state.count and  state.setp , we can also destructure them as {count,step} = state;
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

/* useReducer Hook

 used for state management
 const [count, dispatch] = useReducer(reducer, 0);
 the reducer is a pure function taking two arguments
 e.g.
 first arg is current state and second is action (coming from the dispatch)
 whatever this function returns the state takes that value
  function reducer(state, action) {
  console.log(state, action);
  return state + action; // whatever we return becomes the new state
}


state management with useState is not enough in certain situations:

when components have lot of state variables and updates
when multiple state updates need to happen at the same time
when updating one piece of state depends on one or multiple other pieces of state

in all these cases useReducer can be used.

it is an alternative way of setting state , ideal for complex state and related piece of state.

stores related pieces of state in a state object.

useReducer needs reducer function containing all logic to update state , decouples state logic from component

reducer is a pure function (no side effects) that takes current state and action , and returns the next state.

action:object that describes how to update state
dispatch:function to trigger state updates,by sending actions from event  handlers to the reducer(istead of setState())

realworld analogy:
  for small amount atm(useState)
  for large amount( person(dispatcher)->bank employee(reducer) ->(action) money withdraw-> vault (state))

*/
