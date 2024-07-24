var headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "NmRDWFh3ZjBJRjZqakhiaEc4TEdWM0ZXcjFWTTdiUVEyR3Y4a24yOA=="
);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

const states = [];
fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
  .then((response) => response.json())
  .then((state) => {
    states.push(...state);
  })
  .catch((error) => console.log("error", error));

// const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
states.forEach((state) => {
  fetch(
    `https://api.countrystatecity.in/v1/countries/IN/states/${state.iso2}/cities`,
    requestOptions
  )
    .then((response) => response.json())
    .then((city) => cities.push(...city))
    .catch((error) => console.log("error", error));
});

function findMatches(wordToMatch, cities) {
  return cities.filter((city) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return city.name.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, states);
  const html = matchArray
    .map((state) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = state.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}</span>
        <span class="iso">${state.iso2}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
