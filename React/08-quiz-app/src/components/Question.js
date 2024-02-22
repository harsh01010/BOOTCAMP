import Options from "./Options";

function Question({ question, answer, dispatch }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options question={question} answer={answer} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Question;
