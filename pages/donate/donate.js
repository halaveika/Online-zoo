const inputsDonate = document.querySelectorAll('.pick-friend__donate-input');
const inputAmount = document.querySelector('.pick-friend__another-amount');
let amountValue;
inputsDonate.forEach((input) =>{if (input.checked === true) amountValue = Number(input.id)}); //start amount
// radiobutton donate change listener
inputsDonate.forEach( input => input.addEventListener('click',handleUpdateFromRadio));

function handleUpdateFromRadio () {
  amountValue = Number(this.id);
  inputAmount.value = amountValue;
};

// another amount change listener

inputAmount.oninput = function() {handleUpdateFromInput ()};

function handleUpdateFromInput () {
  //delete check for undefined value
  if (inputAmount.value ==='') inputsDonate.forEach((element) =>{if (element.checked === true) element.checked = false })
   //testing for valid input values
  const re = new RegExp(/^[0-9]{1,4}$/);
  if (re.test(inputAmount.value)) { 
    amountValue = Number(inputAmount.value);
    inputAmount.value
    // checking value of the same radibox element
    inputsDonate.forEach((input) =>{
      if (inputAmount.value === input.id ){
        inputsDonate.forEach((element) =>{if (element.checked === true) element.checked = false })
        input.checked = true;
      }
    });
    // delete overflow input value
  }  else inputAmount.value = inputAmount.value.slice(0, inputAmount.value.length-1);
}