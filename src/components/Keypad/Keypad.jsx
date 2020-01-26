import React from "react";
import PropTypes from "prop-types";
import "./Keypad.css";
import Key from "../Key/Key";

const Keypad = ({
  operators,
  callOperator,
  numbers,
  setOperator,
  updateDisplay
}) => {
  const numberKeys = numbers.map((number, iterator) => (
    <Key
      key={`${number}${iterator}`}
      keyType="number-key"
      keyValue={number}
      keyAction={updateDisplay}
    />
  ));

  const operatorKeys = operators.map((operator, iterator) => (
    <Key
      key={`${operator}${iterator}`}
      keyType="operator-key"
      keyValue={operator}
      keyAction={setOperator}
    />
  ));

  return (
    <div className="keypad-container">
      <div className="numbers-container">{numberKeys}</div>
      <div className="operators-container">{operatorKeys}</div>
      <div className="submit-container">
        <Key keyAction={callOperator} keyType="submit-key" keyValue="=" />
      </div>
    </div>
  );
};

Keypad.propTypes = {
  callOperator: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
  setOperator: PropTypes.func.isRequired,
  updateDisplay: PropTypes.func.isRequired
};

Keypad.defaultProps = {
  numbers: [],
  operators: []
};

export default Keypad;
