function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the Reqct Quiz!</h2>
      <h3>{numQuestions}Questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
