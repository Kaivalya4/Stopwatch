import "./styles.css";
import { useEffect, useReducer } from "react";

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "start":
        return { time: state.time, isworking: true };
      case "stop":
        return { time: state.time, isworking: false };
      case "reset":
        return { time: 0, isworking: false };
      case "tick":
        return { time: state.time + 1, isworking: state.isworking };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, { time: 0, isworking: false });

  useEffect(() => {
    if (state.isworking === false) return;

    const x = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => {
      console.log("hello");
      clearInterval(x);
    };
  }, [state.isworking]);

  //understand in this way that dispatch function calls reducer behind the door and updates the state
  // with the new state returned by reducer

  return (
    <div className="App">
      <div className="counter">{state.time} s</div>
      <div className="common start" onClick={() => dispatch({ type: "start" })}>
        Start
      </div>
      <div className="common stop" onClick={() => dispatch({ type: "stop" })}>
        Stop
      </div>
      <div className="common reset" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </div>
    </div>
  );
}
