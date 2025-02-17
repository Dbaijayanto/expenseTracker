const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.querySelector("#money-minus");


const localStorageTransations = JSON.parse(localStorage.getItem("transations"));

let transations = localStorage.getItem("transations") !== null ? localStorageTransations : [];


function addTransation() 
{

  if (text.value.trim() === "" || amount.value.trim() === "") 
  {
    text.placeholder = "please add a text";

    amount.placeholder = "please add amount";
  }

  else 
  {
    transation = 
    {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };

    transations.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
  }
}
//generate id
function genenrateID() 
{
  return Math.floor(Math.random()*1000000000);
}



//add transations to dom list
function addTransationDOM(transation) 
{
  //get sign
  const sign = transation.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  
  //add class based on value
  item.classList.add(transation.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transation.text} <span>${sign}${Math.abs(
    transation.amount
  )}</span> <button class="delete-btn" onclick="removeTransation(${
    transation.id
  })">x</button>`;
  list.appendChild(item);
}

//update the balance
function updateValues() 
{
  const amounts = transations.map((transation) => transation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `Rs. ${total}`;
  money_plus.innerText = `Rs. ${income}`;
  money_minus.innerText = `Rs. ${expense}`;
}
//remove
function removeTransation(id) {
  transations = transations.filter((transation) => transation.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("transations", JSON.stringify(transations));
}

//init
function init() {
  list.innerHTML = "";
  transations.forEach(addTransationDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransation);