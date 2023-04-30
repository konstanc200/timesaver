import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minuets, setMinuets] = useState(0);
  const [hours, setHour] = useState(0);
  const [color, setColor] = useState("#7FCD91");
  const [backgroundcolor, setbackgroundcolor] = useState("#4D4646");
  const [bordercolor, setbordercolor] = useState("#F5EAEA");
  const [timeValue, setTimeValue] = useState<number>(0);

  const control = useRef(true);

  useEffect(() => {
    chrome.storage.sync.get(["timeValueSum"], (response) => {
      setTimeValue(response.timeValueSum);
      console.log(
        `TimeValueSum from the app component: ${response.timeValueSum}`
      );
    });
  }, [timeValue]);

  useEffect(() => {
    const id = setInterval(() => {
      setMilliseconds(milliseconds + 1);
      if (milliseconds >= 99) {
        setSeconds(seconds + 1);
        setMilliseconds(0);
      } else if (seconds >= 60) {
        setMinuets(minuets + 1);
        setSeconds(0);
      } else if (minuets >= 60) {
        setHour(hours + 1);
        setMinuets(0);
        setSeconds(0);
      } else if (hours >= 24) {
        console.log("YOU HAVE BEEN HERE FOR MORE THAN A DAY! \n GET A LIFE!");
      }
      if (seconds >= timeValue && timeValue != 0 && control.current) {
        control.current = false;
        setColor("#EEEBDD");
        setbackgroundcolor("#CE1212");
        setbordercolor("#1B1717");
        alert("YOU HAVE SPENT TOO MUCH TIME HERE");
      }
    }, 10);

    return () => {
      clearInterval(id);
    };
  }, [milliseconds, seconds, minuets, hours]);

  return (
    <div
      style={{
        all: "unset",
        fontSize: "2vh",
        display: "block",
        color: color,
        fontWeight: "bold",
        padding: "1vh",
        backgroundColor: backgroundcolor,
        border: ".5vh solid " + bordercolor,
      }}
    >
      <header>
        <div
          style={{
            whiteSpace: "nowrap",
          }}
        >
          <h3 style={{ all: "unset" }}>Time spent:</h3>
          <br />
          <div
            style={{
              all: "unset",
              padding: "0",
              color: color,
              fontSize: "2.7vh",
            }}
          >
            {hours <= 9 ? <>0{hours}</> : <>{hours}</>}:
            {minuets <= 9 ? <>0{minuets}</> : <>{minuets}</>}:
            {seconds <= 9 ? <>0{seconds}</> : <>{seconds}</>}:
            {milliseconds <= 9 ? <>0{milliseconds}</> : <>{milliseconds}</>}
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        all: "unset",
        fontSize: "2vh",
        display: "block",
        fontFamily: "monospace",
      }}
      onLoad={() => console.log("Div Loads Fine")}
    >
      <Timer />
    </div>
  );
}

export default App;
