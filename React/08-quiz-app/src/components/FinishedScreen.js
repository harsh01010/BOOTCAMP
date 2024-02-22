function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const percent = (points / maxPoints) * 100;
  let emoji;
  if (percent === 100) emoji = "🥇";
  //   if(percent>=80 && pe)
  return (
    <>
      <p className="result">
        you scored{" "}
        <strong>
          {points} out of {maxPoints}({Math.ceil(percent)}%)
        </strong>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
