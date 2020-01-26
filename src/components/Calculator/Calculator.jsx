import React, { Component } from "react";
import "./Calculator.css";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

class Calculator extends Component {
  state = {
    // value to be displayed in <Display />
    displayValue: "0",
    // values to be displayed in number <Keys />
    numbers: ["9", "8", "7", "6", "5", "4", "3", "2", "1", ".", "0", "ce"],
    // values to be displayed in operator <Keys />
    operators: ["/", "x", "-", "+"],
    // operator selected for math operation
    selectedOperator: "",
    // stored value to use for math operation
    storedValue: ""
  };

  callOperator = () => {
    console.log("call operation");
  };

  setOperator = () => {
    console.log("set operation");
  };

  updateDisplay = value => {
    let { displayValue } = this.state;

    // prevent multiple occurences of '.'
    if (value === "." && displayValue.includes(".")) value = "";

    if (value === "ce") {
      // deletes last char in displayValue
      displayValue = displayValue.substr(0, displayValue.length - 1);
      // set displayValue to '0' if displayValue is empty string
      if (displayValue === "") displayValue = "0";
    } else {
      // replace displayValue with value if displayValue equal to '0'
      // else concatenate displayValue and value
      displayValue === "0" ? (displayValue = value) : (displayValue += value);
    }

    this.setState({ displayValue });
  };

  render = () => {
    // unpack the component state by using Object Destructuring
    const { displayValue, numbers, operators } = this.state;

    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <Keypad
          callOperator={this.callOperator}
          numbers={numbers}
          operators={operators}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  };
}

export default Calculator;
