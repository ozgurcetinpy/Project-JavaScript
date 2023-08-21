"use strict";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const equal = document.querySelector(".equals");
const input = document.querySelector("#result");

const clearInput = function () {
  input.value = "";
};

// Adding Number to the Panel
numbers.forEach((num) =>
  num.addEventListener("click", function () {
    input.value += Number(num.textContent);
  })
);

/// Clear Panel
clear.addEventListener("click", clearInput);

// Operators
let existingValue;
let existingOperator;
operators.forEach((operator) =>
  operator.addEventListener("click", function () {
    existingValue = Number(input.value);
    existingOperator = operator.textContent;
    clearInput();
  })
);

//Equal
equal.addEventListener("click", function () {
  let result;
  if (existingOperator === "+") {
    result = Number(existingValue) + Number(input.value);
  } else if (existingOperator === "-") {
    result = Number(existingValue) - Number(input.value);
  } else if (existingOperator === "*") {
    result = Number(existingValue) * Number(input.value);
  } else if (existingOperator === "/") {
    result = Number(existingValue) / Number(input.value);
  }
  input.value = result.toFixed(2);
});

// Decimal
decimal.addEventListener("click", function () {
  input.value += ".";
});
