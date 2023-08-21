"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const movements = [];
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount;

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const day = String(date.getDay());
    const mounth = String(date.getMonth());
    const hours = date.getHours();
    const min = date.getMinutes();
    const year = date.getFullYear();
    const time = `${day.padStart(2, "0")}/${mounth.padStart(
      2,
      0
    )}/${year}, ${hours}:${min}`;
    labelDate.textContent = time;

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${type}</div>
          <div class="movements__date">${time}</div>
          <div class="movements__value">${Math.abs(mov.toFixed(2))}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter(function (mov, i, arr) {
      return mov > 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createUsername(accounts);

const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

const login = function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 1;

    updateUI(currentAccount);
  }
};

const transfer = function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recevierAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, recevierAccount);
  inputTransferAmount.value = "";
  inputTransferTo.value = "";
  inputTransferTo.blur();
  if (
    amount > 0 &&
    recevierAccount &&
    amount <= currentAccount.balance &&
    recevierAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recevierAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date());
    recevierAccount.movementsDates.push(new Date());

    updateUI(currentAccount);
  }
};

const deleteAccount = function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1); // Delete Account
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = "";
  inputClosePin.value = "";
};

const loan = function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
};

let sorted = false;
const sortMovements = function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
};

const movementsUI = Array.from(document.querySelectorAll(".movements__value"));

btnLogin.addEventListener("click", login);
btnTransfer.addEventListener("click", transfer);
btnClose.addEventListener("click", deleteAccount);
btnLoan.addEventListener("click", loan);
btnSort.addEventListener("click", sortMovements);
// labelBalance.addEventListener("click", function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (el) => Number(el.textContent.replace("€", ""))
//   );
//   console.log(movementsUI);

// Same
// const movementsUI2 = [...document.querySelectorAll(".movements__value")];
// console.log(
//   movementsUI2.map((el) => Number(el.textContent.replace("€", "")))
// );
// });

// const makeColor = function (e) {
//   e.preventDefault();
//   [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = "orangered";
//     if (i % 3 === 0) row.style.backgroundColor = "blue";
//   });
// };

// labelBalance.addEventListener("click", makeColor);
