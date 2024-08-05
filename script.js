require('dotenv').config()
var headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  process.env.API_KEY
);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

const apiHeader = `https://api.countrystatecity.in/v1`;

// Function to fetch states
function fetchStates() {
  const statesUrl = `${apiHeader}/countries/IN/states`;
  return fetch(statesUrl, requestOptions)
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error fetching states: ${response.statusText}`);
      }
      return response.json();
  });
}

// Function to fetch cities for a given state
function fetchCities(stateId) {
  const citiesUrl = `${apiHeader}/countries/IN/states/${stateId}/cities`;
  return fetch(citiesUrl,requestOptions)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error fetching cities for state ${stateId}: ${response.statusText}`);
          }
          return response.json();
      });
}

// Main function to fetch states and then fetch cities for each state
function fetchStatesAndCities() {
  fetchStates()
      .then(states => {
          console.log('Fetched states with then:', states);
          const cityPromises = states.map(state => {
              return fetchCities(state.id).then(cities => {
                  return { stateId: state.id, cities: cities };
              });
          });
          return Promise.all(cityPromises);
      })
      .then(citiesArray => {
          console.log('Fetched cities for each state with then:', citiesArray);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

// // Call the main function
// fetchStatesAndCitiesWithThen();
