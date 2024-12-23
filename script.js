
// usamos api para conversion de divisas `ExchangeRate-API` https://api.exchangerate-api.com/v4/latest/USD

const API_URL = `https://api.exchangerate-api.com/v4/latest/USD`;

//seleccionamos los elementos 
const convertButton = document.getElementById(`convertButton`);
const amountImput = document.getElementById(`amount`);
const fromCurrencySelect = document.getElementById(`fromCurrency`);
const toCurrencySelect = document.getElementById(`toCurrency`);
const resultDiv = document.getElementById(`result`);

// Obtener las tasas de cambio desde la api

async function getExchangeRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.rates; 
}


async function populateCurrencies() {
    const rates =await getExchangeRates();
    const currencies = Object.keys(rates);

    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
};



// manejar el evento click en el boton 

convertButton.addEventListener(`click`, async () => {
    const amount = parseFloat(amountImput.value); // obtener el monto ingresado
    const fromCurrency = fromCurrencySelect.value; // obtener la moneda de origen 
    const toCurrency = toCurrencySelect.value; // obtener la moneda de origen 

    // verificar y proceder con la conversion si el monto es valido <= 0
    if (isNaN(amount) || amount <=0) {
        resultDiv.textContent = `ingresar un monto válido`
        return;        
    }

    //obtener la tasa de cambio 
    const rates = await getExchangeRates();

    //verificar si las monedas seleccionadas son validas
    if (!rates[fromCurrency] || !rates[toCurrency]) {
        resultDiv.textContent = `monedas no validas`;
        return;
    }

    //realizar la conversion 
    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = amount * conversionRate;

    resultDiv.textContent = `${amount} ${fromCurrency} es igual a ${convertedAmount.toFixed(2)} ${toCurrency}`;

});

populateCurrencies();

const clearBotton = document.getElementById(`clearButton`)

clearBotton.addEventListener(`click`, () => {
    amountImput.value = ``;
    fromCurrencySelect.selectedIndex = 0;
    toCurrencySelect.selectedIndex = 0;
    resultDiv.textContent = ``;
});

// JavaScript para cambiar el tema
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Verificamos el estado del interruptor al cargar la página
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    themeToggle.checked = true;
}

// Evento para cambiar el tema cuando el interruptor cambia
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }
});

