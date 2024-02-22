function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return question.options.map((option, index) => (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        hasAnswered
          ? index === question.correctOption
            ? "correct"
            : "wrong"
          : ""
      }`}
      key={option}
      disabled={answer !== null}
      onClick={() => dispatch({ type: "newAnswer", payload: index })}
    >
      {option}
    </button>
  ));
}

export default Options;
