let apiKey = "8294abfd53679a485b414225";
let apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let amount = document.getElementById("amount");
let convert = document.getElementById("convert");
let result = document.getElementById("result");

async function load() {
    try{
        let response = await fetch(apiUrl + "USD");
        let data = await response.json();
        let currencies = Object.keys(data.conversion_rates);

        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);
        
            let option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    } catch (error) {
        console.error("Ошибка при конвертации:", error);
    }
}

async function convertCur() {
    try{
        let from = fromCurrency.value;
    let to = toCurrency.value;
    let amountValue = amount.value;

    let response = await fetch(apiUrl + from);
    let data = await response.json();
    let rate = data.conversion_rates[to];
    let converted = (amountValue * rate).toFixed(3);
    result.textContent = `${amountValue} ${from} = ${converted} ${to}`
    } catch(error) {
        console.log("Ошибка при конвертации", error);
        result.textContent = "Ошибка";
    }
} 

load();
convert.addEventListener("click", convertCur);

