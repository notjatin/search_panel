var headers = new Headers();
headers.append("X-CSCAPI-KEY", "NmRDWFh3ZjBJRjZqakhiaEc4TEdWM0ZXcjFWTTdiUVEyR3Y4a24yOA==");

var requestOptions = {
 method: 'GET',
 headers: headers,
 redirect: 'follow'
};

const states = [];
fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
.then(response => response.json())
.then(state => states.push(...state))
.catch(error => console.log('error', error));

// const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const getCities = (state) => {
    const cities = []
    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`, requestOptions)
    .then(response => response.json())
    .then(city => cities.push(...city))
    .catch(error => console.log('error', error))

    return cities
}

// function findMatches(wordToMatch, cities) {
//   return cities.filter(place => {
//     // here we need to figure out if the city or state matches what was searched
//     const regex = new RegExp(wordToMatch, 'gi');
//     return place.city.match(regex) || place.state.match(regex)
//   });
// }

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// function displayMatches() {
//   const matchArray = findMatches(this.value, cities);
//   const html = matchArray.map(place => {
//     const regex = new RegExp(this.value, 'gi');
//     const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
//     const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
//     return `
//       <li>
//         <span class="name">${cityName}, ${stateName}</span>
//         <span class="population">${numberWithCommas(place.population)}</span>
//       </li>
//     `;
//   }).join('');
//   suggestions.innerHTML = html;
// }

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);
