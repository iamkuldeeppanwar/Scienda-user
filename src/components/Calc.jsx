import { useState } from "react";
import "./index.css";

export default function Calc() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperator] = useState(null);

  const handleClick = (e) => {
    const getSameValue = e.currentTarget.value;
    switch (getSameValue) {
      // Numbers
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        setCurrentValue(
          currentValue === "0" ? getSameValue : currentValue + getSameValue
        );
        break;

      // Calculator operations
      case "+":
      case "-":
      case "*":
      case "%":
        setPreviousValue(currentValue);
        setCurrentValue("");
        setOperator(getSameValue);
        break;
      // error handling for not dividing by 0
      case "/":
        if (currentValue === "0") {
          alert("Cannot divide by zero");
          break;
        }
        setPreviousValue(currentValue);
        setCurrentValue("");
        setOperator(getSameValue);
        break;

      //If there is a decimal point
      case ".":
        if (!currentValue.includes(".")) {
          setCurrentValue(currentValue + ".");
        }
        break;

      // Calculating the result
      case "=":
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        const computation = // if operation is equal to operation, do the operation of previous value and current value
          operation === "+"
            ? prev + curr
            : operation === "-"
            ? prev - curr
            : operation === "*"
            ? prev * curr
            : operation === "/"
            ? prev / curr
            : operation === "%"
            ? (prev / 100) * curr
            : curr;
        setCurrentValue(computation); // sets the value to the computation variable
        setPreviousValue(""); // erases previous value
        setOperator(null); // erases the value of operator used

        break;

      // Clearing the results
      case "clearAll":
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        break;
      case "clearEntry":
        setCurrentValue("0");
        break;
      default:
        setCurrentValue(null);
        break;
    }
  };

  // Add a value attrbute to the buttons
  // Make the buttons 0 - 9, ., +, -, /, * C, CE, %, =
  // place in table of 4 columns(4 elements), 5 rows

  return (
    <div className="App">
      {/*This outputs the value to a paragraph*/}
      <p id="resultScreen">
        {previousValue}
        {operation}
        {currentValue}
      </p>
      <div className="calcBtns" id="firstRow">
        <button className="calbutton" value="clearAll" onClick={handleClick}>
          AC
        </button>
        <button className="calbutton" value="clearEntry" onClick={handleClick}>
          CE
        </button>
        <button className="calbutton" value="%" onClick={handleClick}>
          %
        </button>
        <button className="calbutton" value="/" onClick={handleClick}>
          ÷
        </button>
      </div>
      <div className="calcBtns">
        <button className="calbutton" value="7" onClick={handleClick}>
          7
        </button>
        <button className="calbutton" value="8" onClick={handleClick}>
          8
        </button>
        <button className="calbutton" value="9" onClick={handleClick}>
          9
        </button>
        <button className="calbutton" value="*" onClick={handleClick}>
          x
        </button>
      </div>
      <div className="calcBtns">
        <button className="calbutton" value="4" onClick={handleClick}>
          4
        </button>
        <button className="calbutton" value="5" onClick={handleClick}>
          5
        </button>
        <button className="calbutton" value="6" onClick={handleClick}>
          6
        </button>
        <button className="calbutton" value="-" onClick={handleClick}>
          -
        </button>
      </div>
      <div className="calcBtns">
        <button className="calbutton" value="1" onClick={handleClick}>
          1
        </button>
        <button className="calbutton" value="2" onClick={handleClick}>
          2
        </button>
        <button className="calbutton" value="3" onClick={handleClick}>
          3
        </button>
        <button className="calbutton" value="+" onClick={handleClick}>
          +
        </button>
      </div>
      <div className="calcBtns">
        <button
          className="calbutton"
          id="bigZero"
          value="0"
          onClick={handleClick}
        >
          0
        </button>
        <button className="calbutton" value="." onClick={handleClick}>
          .
        </button>
        <button className="calbutton" value="=" onClick={handleClick}>
          =
        </button>
      </div>
    </div>
  );
}
