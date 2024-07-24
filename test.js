var headers = new Headers();
headers.append("X-CSCAPI-KEY", "NmRDWFh3ZjBJRjZqakhiaEc4TEdWM0ZXcjFWTTdiUVEyR3Y4a24yOA==");

var requestOptions = {
 method: 'GET',
 headers: headers,
 redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
.then(response => console.log(response.text()))
.then(result => console.log(result))
.catch(error => console.log('error', error));