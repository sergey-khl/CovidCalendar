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
        var country = document.createElement("option")
        country.innerHTML = element["Country"]
        country.value = element["Slug"]
        countryList.appendChild(country)
    }))
    .catch(error => console.log('error', error));


var el = document.getElementById('chosendate')
el.addEventListener('change', () => {
  const month = el.value
  var chosenDate = "confirmed?from=" + month + "-01T00:00:00Z&to=" + month + "-30T00:00:00Z"
  alert(chosenDate)
})
