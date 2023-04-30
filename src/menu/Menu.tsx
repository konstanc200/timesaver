import React, { useState, useEffect, useRef } from "react";
import img from "../../../extension/assets/logoNEW02.png";
import "./menu.css";

function TimePicker() {
  const [timeValueHours, setTimeValueHours] = React.useState<string>("");
  const [timeValueMinuts, setTimeValueMinutes] = React.useState<string>("");

  const controlEffects = useRef(true);

  const [timeValueSum, setTimeValueSum] = React.useState<number>(0);

  const [timeValue, setTimeValue] = React.useState<number>(0);

  const displaystandartizer = (unit: string, unitType: string) => {
    let unitExp: string = unit;
    if (+unit[0] != 0) {
      unitExp = +unit <= 9 ? "0" + unit : unit;
    }
    if (unit.length > 2) {
      unitExp = unitExp[1] + unitExp[2];
    }

    if (unitType === "min") {
      unitExp = +unit > 59 ? "0" + unit[1] : unitExp;
    }
    return unitExp;
  };

  const timeNormalizer = () => {
    let hour = +timeValueHours;
    let min = +timeValueMinuts;
    setTimeValueSum((hour * 60 + min) * 60);

    chrome.storage.sync.set({ timeValueHours }, () => {
      console.log(`Time Value Hours from Chorome API is ${timeValueHours}`);
    });

    chrome.storage.sync.set({ timeValueMinuts }, () => {
      console.log(`Time Value Hours from Chorome API is ${timeValueMinuts}`);
    });
  };

  chrome.storage.sync.set({ timeValueSum }, () => {
    console.log(`Time Value Sum from Chorome API is ${timeValueSum}`);
  });

  useEffect(() => {
    chrome.storage.sync.get(["timeValueSum"], (response) => {
      setTimeValue(response.timeValueSum);
      console.log(
        `TimeValueSum from the app component: ${response.timeValueSum}`
      );
    });
    try {
      if (controlEffects.current) {
        chrome.storage.sync.get(["timeValueHours"], (response) => {
          if (typeof response.timeValueHours != "undefined") {
            setTimeValueHours(response.timeValueHours);
          }
          console.log(
            `TimeValueSum from the app component Hours: ${response.timeValueHours}`
          );
        });
        chrome.storage.sync.get(["timeValueMinuts"], (response) => {
          if (typeof response.timeValueMinuts != "undefined") {
            setTimeValueMinutes(response.timeValueMinuts);
          }
          console.log(
            `TimeValueSum from the app component Minutes: ${response.timeValueMinuts}`
          );
        });
      }
    } catch {
      console.log("NO INITIAL VALUE");
      setTimeValueHours("00");
      setTimeValueMinutes("00");
    }
    controlEffects.current = false;
  }, [timeValue, timeValueHours, timeValueMinuts]);

  return (
    <div className="input-holder-div">
      <div className="input-text-div">
        <h1 className="input-text">Time Limit</h1>
      </div>
      <div className="input-field-holder-div">
        <div className="hour-input-div">
          <input
            className="hour-input input-font"
            type="number"
            placeholder="hh"
            value={
              +timeValueHours === 0
                ? undefined
                : displaystandartizer(timeValueHours, "hour")
            }
            onChange={(event) => {
              setTimeValueHours(event.target.value);
            }}
          />
        </div>
        <div className="separator-div">
          <text
            style={{ border: "none", fontFamily: "initial" }}
            className="separator input-font"
          >
            :
          </text>
        </div>
        <div className="minutes-input-div">
          <input
            className="minutes-input input-font"
            type="number"
            placeholder="mm"
            value={
              +timeValueMinuts === 0
                ? undefined
                : displaystandartizer(timeValueMinuts, "min")
            }
            onChange={(event) => {
              setTimeValueMinutes(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="button-input-div">
        <input
          type="button"
          className="input-button input-font"
          onClick={timeNormalizer}
          value="Set Limit"
        />
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="wrapper">
      <div className="inner-holder">
        <div className="header">
          <div className="header-logo-img-div">
            <img src={img} className="header-logo-img" />
          </div>
          <div className="title-div">
            <h1 className="title-first-part">Time</h1>
            <h1 className="title-second-part">Saver</h1>
          </div>
        </div>
        <div>
          <TimePicker />
        </div>
        <div className="info-text-div">
          <text className="info-text">*Refresh window to apply changes!</text>
        </div>
      </div>
    </div>
  );
}

export default Menu;
