const countryList = document.querySelector("#country")
const dateSelect = document.getElementById('chosendate')
const submitButton = document.querySelector(".submit-button")

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

submitButton.addEventListener('click', function(){
    function getSelectedOption(sel) {
        var opt;
        for ( var i = 0, len = sel.options.length; i < len; i++ ) {
            opt = sel.options[i];
            if ( opt.selected === true ) {
                break;
            }
        }
        return opt;
    }
    var countryName = getSelectedOption(countryList);
    const month = dateSelect.value;
    var chosenDate = "confirmed?from=" + month + "-01T00:00:00Z&to=" + month + "-30T00:00:00Z"
    alert(countryName.value + "\n" + chosenDate)
})
