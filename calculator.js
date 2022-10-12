/* First, we select all the inputs, and we save them in const /// Primero seleccionamos todos los inputs, los guardamos en constantes*/


const bill_input = document.querySelector('#bill-input-value');
const percentage_tip_btn = document.querySelector('.percentage-tip');
// Remenber to SPECIFY "all" when the query selector involve  an array of elements
const percentage_tip_btn_values = document.querySelectorAll('.percentage-tip');
const percentage_tip_custom = document.querySelector('#percentage-custom');
const n_persons = document.querySelector('#n-persons');
const tip_amount_result = document.querySelector('.tip-p') ; 
const total_amount_result = document.querySelector('.tip-t') ;
const reset_button = document.querySelector('.reset-button');
const error_msg = document.querySelector('.error_msg');

/* We start creating the logic of the calculator / Empezamos a crear la logica de la calculadora*/

/*---------RESET BUTTON---------*/
/* we launch an add event listener so the button can start working, this button sets the value of 
each input in 0 */

reset_button.addEventListener('click', ()=>{
	tip_amount_result.innerHTML = '$-';
	total_amount_result.innerHTML='$-';
	reset_button.classList.remove('reset-active')
});

/* here we have an activation of the background color of reset button, everytime an input is filled, the button
get the property "reset-active" but every time the event click on the button happens this name class is removed*/


const resetButtonColor = () => reset_button.classList.add('reset-active');

bill_input.addEventListener('input', resetButtonColor);
n_persons.addEventListener('input', resetButtonColor);
percentage_tip_custom.addEventListener('input',resetButtonColor);


/*---------ERROR N PERSOns INPUT---------*/


n_persons.addEventListener('input', () =>{
	if(n_persons.value <= 0){
		n_persons.classList.add('error');
		error_msg.classList.remove('hide');
	}else{
		n_persons.classList.remove('error');
		error_msg.classList.add('hide');
	}
})

/*---------CALCULATE LOGIC---------*/

bill_input.value = 0;
n_persons.value = 1;

let billValue = 0;
let nPersonsValue = 1; 
let percentageTipValue = 0.1;

/*-----Every time an input is filled, the calculator starts the function "calculateTip"---------*/


function billInput(){
	billValue = parseFloat(bill_input.value);
	calculateTip();
};

function nPersonsInput(){
	nPersonsValue = parseFloat(n_persons.value);
	calculateTip();
};

function percentageInput(){
	percentageTipValue = parseFloat(percentage_tip_custom.value/100);
	calculateTip();
};

/*----------Handle click event for the percentage buttons------*/
function handleClick(event){
	percentage_tip_btn_values.forEach(
		(btn) => {
			btn.classList.remove('active')

		if(event.target.innerHTML == btn.innerHTML){
			btn.classList.add('active')
			//Here we convert the value of the inner html into an usable number
			let tipPercentageRawValue = btn.innerHTML;
			let convertedTipPercentageValue = tipPercentageRawValue.replace('%','')
			// we save the value of the input in the "convertedTip..." variable, so, when we used it in the "percentageTip... variable" we only have to do a parseFLoat / 100 (because is a % value)
			percentageTipValue = parseFloat(convertedTipPercentageValue /100)
			}
		})
	calculateTip();
}

function calculateTip(){
	if(billValue > 0 && nPersonsValue >0){
		// This variables are created with the purpouse of saving the value of the input so we can handle it and pass it to the corresponding HTMl
		let tip_amount = (billValue*percentageTipValue)/nPersonsValue;
		let total_amount = (billValue/nPersonsValue) + tip_amount;
		tip_amount_result.innerHTML = '$' + tip_amount.toFixed(2);
		total_amount_result.innerHTML = '$' + total_amount.toFixed(2);
	}
}
/*--------Event listener on each button and input-----*/

bill_input.addEventListener('input',billInput);
n_persons.addEventListener('input',nPersonsInput);
percentage_tip_custom.addEventListener('input',percentageInput);
//This is important, you have to check that every  button executes the function "handleClick" that is why we use a forEach*/
percentage_tip_btn_values.forEach((btn)=>{
	btn.addEventListener('click',handleClick)
})