"use strict";

const billAmount = document.querySelector("#bill");
const tipPercentage = document.querySelector("#tip");
const total = document.querySelector("#total");
const btnEl = document.querySelector("#calculate");

const calculate = function () {
  const bill = Number(billAmount.value);
  const tip = Number(tipPercentage.value);
  const totalFee = bill + (bill / 100) * tip;
  total.textContent = totalFee.toFixed(2);
};

btnEl.addEventListener("click", calculate);
