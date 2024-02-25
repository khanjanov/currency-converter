const user_input = document.querySelector("#user_input");
const currency_name = document.querySelector("#currency_name");

const fromCurrencySelect = document.querySelector("#from_currency");
const fromCurrencyInput = document.querySelector("#from_value");

const toCurrencySelect = document.querySelector("#to_currency");
const toCurrencyInput = document.querySelector("#to_value");

const fromSymbol = document.querySelector("#from_symbol");
const toSymbol = document.querySelector("#to_symbol");

const baseUrl = "http://localhost:3000";

let currencyList = [];

const getValues = () => {
  return {
    toCurrency:
      currencyList.find((currency) => currency.code == toCurrencySelect.value)
        ?.value || null,
    fromCurrency:
      currencyList.find((currency) => currency.code == fromCurrencySelect.value)
        ?.value || null,
    toValue: +toCurrencyInput.value,
    fromValue: +fromCurrencyInput.value,
  };
};

const setCurrencies = () => {
  for (let i = 0; i < currencyList.length; i++) {
    const item = currencyList[i];

    const option = document.createElement("option");
    option.value = item.code;
    option.text = item.code + "-" + item.name;
    option.setAttribute("data-symbol", item.symbol);

    toCurrencySelect.append(option.cloneNode(true));
    fromCurrencySelect.append(option);
  }
};

const getCurrenciesList = () => {
  return fetch(baseUrl + "/currencies")
    .then((res) => res.json())
    .then((data) => {
      currencyList = data;
      setCurrencies();
    });
};

getCurrenciesList();

const fromCurrencyInputEventHandler = (e) => {
  const data = getValues();
  let isValid = true;

  if (!(data.toCurrency || data.fromCurrency)) {
    isValid = false;
  }

  let value = null;
  if (e.target.value && isValid) {
    value = (+data.toCurrency / +data.fromCurrency) * data.fromValue;
  }

  if (!isValid) {
    alert("Select Currency");
    e.target.value = "";
  }

  toCurrencyInput.value = value;
};

const toCurrencyInputEventHandler = (e) => {
  const data = getValues();
  let isValid = true;

  if (!(data.toCurrency || data.fromCurrency)) {
    isValid = false;
  }

  let value = null;

  console.log(data);

  if (e.target.value && isValid) {
    value = data.toValue / (+data.toCurrency / +data.fromCurrency);
  }

  if (!isValid) {
    alert("Select Currency");
    e.target.value = "";
  }

  fromCurrencyInput.value = value;
};

fromCurrencyInput.addEventListener("keyup", fromCurrencyInputEventHandler);
toCurrencyInput.addEventListener("keyup", toCurrencyInputEventHandler);

toCurrencySelect.addEventListener("change", (e) => {
  toSymbol.innerHTML = currencyList.find(
    (currencyItem) => currencyItem.code == e.target.value
  )?.symbol;
  fromCurrencyInputEventHandler(e);
});
fromCurrencySelect.addEventListener("change", (e) => {
  fromSymbol.innerHTML = currencyList.find(
    (currencyItem) => currencyItem.code == e.target.value
  )?.symbol;
  fromCurrencyInputEventHandler(e);
});
