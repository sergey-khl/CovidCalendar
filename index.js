const countryList = document.querySelector("#country")

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.covid19api.com/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result["countriesRoute"]))
    .catch(error => console.log('error', error));
  
    fetch("https://api.covid19api.com/countries", requestOptions)
    .then(response => response.json())
    .then(result => result.forEach(element => {
        countryList.innerHTML += "<option>" + element["Country"] + "</option>"
    }))
    .catch(error => console.log('error', error));
