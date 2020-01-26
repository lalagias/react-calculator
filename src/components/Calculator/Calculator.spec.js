import React from "react";
import { mount, shallow } from "enzyme";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

describe("Calculator", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("should render correctly", () => expect(wrapper).toMatchSnapshot());

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render the Display and Keypad Components", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <Display displayValue={wrapper.instance().state.displayValue} />,
        <Keypad
          callOperator={wrapper.instance().callOperator}
          numbers={wrapper.instance().state.numbers}
          operators={wrapper.instance().state.operators}
          setOperator={wrapper.instance().setOperator}
          updateDisplay={wrapper.instance().updateDisplay}
        />
      ])
    ).toEqual(true);
  });

  describe("updateDisplay", () => {
    let wrapper;

    beforeEach(() => (wrapper = shallow(<Calculator />)));

    it("updates displayValue", () => {
      wrapper.instance().updateDisplay("5");
      expect(wrapper.state("displayValue")).toEqual("5");
    });

    it("concatenates displayValue", () => {
      wrapper.instance().updateDisplay("5");
      wrapper.instance().updateDisplay("0");
      expect(wrapper.state("displayValue")).toEqual("50");
    });

    it("removes leading '0'from displayValue", () => {
      wrapper.instance().updateDisplay("0");
      expect(wrapper.state("displayValue")).toEqual("0");
      wrapper.instance().updateDisplay("5");
      expect(wrapper.state("displayValue")).toEqual("5");
    });

    it("prevents multiple leading '0's from displayValue", () => {
      wrapper.instance().updateDisplay("0");
      wrapper.instance().updateDisplay("0");
      expect(wrapper.state("displayValue")).toEqual("0");
    });

    it("removes last char of displayValue", () => {
      wrapper.instance().updateDisplay("5");
      wrapper.instance().updateDisplay("0");
      wrapper.instance().updateDisplay("ce");
      expect(wrapper.state("displayValue")).toEqual("5");
    });

    it("prevents multiple instances of '.' in displayValue", () => {
      wrapper.instance().updateDisplay(".");
      wrapper.instance().updateDisplay(".");
      expect(wrapper.state("displayValue")).toEqual(".");
    });

    it("will set displayValue to '0' if displayValue is equal to an empty string", () => {
      wrapper.instance().updateDisplay("ce");
      expect(wrapper.state("displayValue")).toEqual("0");
    });
  });
});

describe("mounted Calculator", () => {
  let wrapper;

  beforeEach(() => (wrapper = mount(<Calculator />)));

  it("it calls updateDisplay when a number key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "updateDisplay");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".number-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls setOperator when an operator key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "setOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".operator-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls callOperator when the submit key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "callOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".submit-key").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
