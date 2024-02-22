import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./Main";
import { act } from "react-dom/test-utils";
import Loader from "./Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 60;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
  //'loading','error','ready','active','finished'
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? 10 + state.points
            : state.points,
      };
    case "nextQuestion":
      const lastQn = state.index === state.questions?.length - 1;
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: lastQn ? "finished" : "active",
        highscore:
          lastQn && state.points > state.highscore
            ? state.points
            : state.highscore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        status: "ready",
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0 ? "active" : "finished",
      };

    default:
      throw new Error("unknown action");
  }
}
function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => (acc += curr.points), 0);
  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    getData();
    console.log(questions);
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

/*

useState:
  ideal for single ,independent pieces of state

  Logic to update state is placed directly in event handler or effects,spread all over one or multiple components

  state is updated by calling setState 

  imperative state updates

  easy to understand and to use


UseReducer:
  ideal for multiple pieces of state and complex state(e.g object with many values and nested objects or arrays)

  logic to update state lives in one central place,decoupled from components: the reducer

  state is updated by dispatching an action to a reducer

  declarative state updates: complex state transitions are mapped to actions

  more difficult to understand and implement


  when to use useReducer:
    more than one piece of state frequently update together or more than 2-3 related states or too many event handlers.



*/
