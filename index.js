const countryList = document.querySelector("#country")
const dateSelect = document.getElementById('chosendate')
const submitButton = document.querySelector(".submit-button")
let calendarTitle = document.getElementById('calendar-title')
let youHaveChosen = document.getElementById('you-have-chosen')
let calendarGrid = document.querySelector('date-grid')
const months = {
  '01':'January',
  '02':'February',
  '03':'March',
  '04':'April',
  '05':'May',
  '06':'June',
  '07':'July',
  '08':'August',
  '09':'September',
  '10':'October',
  '11':'November',
  '12':'December'
}

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


submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    function getSelectedOption(sel) {
        var opt;
        for (var i = 0, len = sel.options.length; i < len; i++) {
            opt = sel.options[i];
            if (opt.selected === true) {
                break;
            }
        }
        return opt;
    }
    var countryName = getSelectedOption(countryList);
    const month = dateSelect.value;

    // Change the calendar title
    var yearMonth = month.split("-")
    var chosenDate
    // Get data for the month chosen AND one day after that month
    // Except for december, that will be only that month
    calendarTitle.innerHTML = months[yearMonth[1]] + " " + yearMonth[0]
    if (Number(yearMonth[1]) < 12) {
      var nextMonth = ("00"+ (Number(yearMonth[1])+1)).slice(-2)
      chosenDate = "confirmed?from=" + month + "-01T00:00:00Z&to=" + nextMonth + "-01T00:00:00Z"
      alert(chosenDate)
    } else {
      chosenDate = "confirmed?from=" + month + "-01T00:00:00Z&to=" + month + "-31T00:00:00Z"
      alert(chosenDate)
    }
    youHaveChosen.innerHTML = "Confirmed cases in "+countryName.innerHTML+" in "+months[yearMonth[1]];

    fetch("https://api.covid19api.com/country/" + countryName.value + "/status/" + chosenDate, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(element => {
            console.log(element["Cases"])
        }))
        .catch(error => console.log('error', error));
})
