import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

// fetchCountries('ukraine')
// .then(country => console.log(country))

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  let inputValue = input.value.trim();
  // console.log(inputValue)
  fetchCountries(inputValue)
    .then(countries => renderMarkup(countries))
    .catch(error => console.log(error));
}

function renderMarkup(countries) {
  if (countries.length >= 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length >= 2 && countries.length < 10) {
    Notify.info('From 2 to 10 countries left');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    countryList.innerHTML = countries
      .map(
        ({ flags, name }) =>
          `
      <li class="item"><img
      src="${flags.svg}"
      alt="${name.official}"
      width="60"
      height="40"
      class="country-flag">
      <p class="item-info">${name.official}</p>
      </li>
      `
      )
      .join('');
    //ТУТ БУДЕ ВИВОДИТИСЯ СПИСОК КРАЇН
  }
  if (countries.length === 1) {
    Notify.info('You find your country!');
    countryList.innerHTML = '';
    countryInfo.innerHTML = countries
      .map(
        ({ flags, name, capital, population, languages }) =>
          `
        <img src="${flags.svg}" alt="${
            name.official
          }" width="60" height="40" class="country-flag">
        <h1 class="country-name">${name.official}</h1>
        <p class="info-item">
        <span class="accent">Capital: </span>${capital}
        </p>
        <p class="info-item">
        <span class="accent">Population: </span>${population} humans
        </p>
        <p class="info-item">
        <span class="accent">Languages: </span>${Object.values(languages).join(
          ', '
        )}
        </p>
      `
      )
      .join('');
    // ТУТ БУДЕ ІНФОРМАЦІЯ ПРО КРАЇНУ
  }
}
