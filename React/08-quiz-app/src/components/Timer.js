import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  function tick() {
    dispatch({ type: "tick" });
  }
  useEffect(() => {
    const id = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(id); // we must remove the interval,otherwise the timer will move with double speed next time.
  }, [dispatch]);
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - minutes * 60;
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
