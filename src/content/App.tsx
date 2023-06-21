import React, { useState, useEffect, useRef } from "react";
import "./font.css";

function Timer() {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minuets, setMinuets] = useState<number>(0);
  const [hours, setHour] = useState<number>(0);
  const [color, setColor] = useState("#7FCD91");
  const [backgroundcolor, setbackgroundcolor] = useState("#4D4646");
  const [bordercolor, setbordercolor] = useState("#F5EAEA");
  const [timeValue, setTimeValue] = useState<number>(0);

  const control = useRef(true);
  const controlEffects = useRef(true);
  const currentTab = useRef<string>(location.href);

  useEffect(() => {
    chrome.storage.sync.get(["timeValueSum"], (response) => {
      setTimeValue(response.timeValueSum);
    });
    if (controlEffects.current) {
      const sekKeySec = currentTab.current + "_SECONDS";
      const sekKeyMin = currentTab.current + "_MINUETS";
      const sekKeyHour = currentTab.current + "_HOURS";
      chrome.storage.session.get([sekKeySec], (response) => {
        if (typeof response[sekKeySec] != "undefined") {
          setSeconds(response[sekKeySec]);
        }
      });
      chrome.storage.session.get([sekKeyMin], (response) => {
        if (typeof response[sekKeyMin] != "undefined") {
          setMinuets(response[sekKeyMin]);
        }
      });
      chrome.storage.session.get([sekKeyHour], (response) => {
        if (typeof response[sekKeyHour] != "undefined") {
          setHour(response[sekKeyHour]);
        }
      });

      controlEffects.current = false;
    }
  }, [timeValue, seconds, minuets, hours]);

  useEffect(() => {
    const id = setInterval(() => {
      setMilliseconds(milliseconds + 1);
      if (milliseconds >= 99) {
        setSeconds(seconds + 1);
        setMilliseconds(0);
        chrome.storage.session.set({
          [currentTab.current + "_SECONDS"]: seconds + 1,
        });
      } else if (seconds >= 60) {
        setMinuets(minuets + 1);
        setSeconds(0);
        chrome.storage.session.set({
          [currentTab.current + "_MINUETS"]: minuets + 1,
        });
      } else if (minuets >= 60) {
        setHour(hours + 1);
        setMinuets(0);
        setSeconds(0);
        chrome.storage.session.set({
          [currentTab.current + "_HOURS"]: hours + 1,
        });
      } else if (hours >= 24) {
        alert("YOU HAVE BEEN HERE FOR MORE THAN A DAY! \n GET A LIFE!");
      }
      if (
        (hours * 60 + minuets) * 60 >= timeValue &&
        timeValue != 0 &&
        control.current
      ) {
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
          <h3 style={{ all: "unset", fontSize: "1.7vh" }}>Time spent:</h3>
          <br />
          <div
            style={{
              all: "unset",
              padding: "0",
              color: color,
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
        display: "block",
      }}
      className="mono-font"
      onLoad={() => console.log("Div Loads Fine")}
    >
      <Timer />
    </div>
  );
}

export default App;
