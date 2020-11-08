const countryList = document.getElementById('country')
const dateSelect = document.getElementById('chosendate')
const submitButton = document.querySelector(".submit-button")
let calendarTitle = document.getElementById('calendar-title')
let youHaveChosen = document.getElementById('you-have-chosen')
let calendarGrid = document.querySelector('.date-grid')

const months = { // Object for the months of 2020 in digits, words and amount of days
  '01':['January','31'],
  '02':['February','29'],
  '03':['March','31'],
  '04':['April','30'],
  '05':['May','31'],
  '06':['June','30'],
  '07':['July','31'],
  '08':['August','31'],
  '09':['September','30'],
  '10':['October','31'],
  '11':['November','30'],
  '12':['December','31']
}

// Fetching initial data from COVID 19 API https://documenter.getpostman.com/view/10808728/SzS8rjbc
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
    .then(result => result.sort(function(a,b){ // Sorting function for alphabetical countries
        var countryA = a["Country"]
        var countryB = b["Country"]
        return (countryA < countryB) ? -1 : (countryA > countryB) ? 1 : 0;
    }))
    .then(result => result.forEach(element => {
        var country = document.createElement("option")
        country.innerHTML = element["Country"]
        country.value = element["Slug"]
        countryList.appendChild(country)
    }))
    .catch(error => console.log('error', error));


submitButton.addEventListener('click', function (e) {
    var currday = 1
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
    // Get data for the month chosen 
    calendarTitle.innerHTML = months[yearMonth[1]][0] + " " + yearMonth[0]
    chosenDate = "confirmed?from=" + month + "-01T00:00:00Z&to=2020-" + yearMonth[1] + "-" + months[yearMonth[1]][1] + "T00:00:00Z"
    alert(chosenDate)
    youHaveChosen.innerHTML = "Confirmed cases in " + countryName.innerHTML + " in "+months[yearMonth[1]][0];

    // reset calendar grid

    calendarGrid.innerHTML = ""
    fetch("https://api.covid19api.com/country/" + countryName.value + "/status/" + chosenDate, requestOptions)
        .then(response => response.json())
        .then(function (result) {
            //create cell in calendar
            // Creates a cell for each element for that month and stops at the last day
            for (var i=0; i<=Number(months[yearMonth[1]][1]); i++) {
                var element = result[i];
                var cell = document.createElement("button")
                var day = document.createElement("h3")
                day.textContent = currday
                currday += 1
                day.setAttribute('class', 'date')
                cell.appendChild(day)
                div = document.createElement('div')
                div.setAttribute('class', 'covid-data')
                var totalCases = document.createElement("h3")
                totalCases.textContent = "Total Cases: " + element["Cases"]
                totalCases.setAttribute('class', 'total-cases')
                var newCases = document.createElement("h3")
                newCases.textContent = "New Cases: " + element["Cases"]
                newCases.setAttribute('class', 'new-cases')
                var change = document.createElement("h3")
                change.textContent = "% Change: " + element["Cases"]
                change.setAttribute('class', '%-change')
                div.appendChild(totalCases)
                div.appendChild(newCases)
                div.appendChild(change)
                cell.appendChild(div)

                // add cell to calendar
                calendarGrid.appendChild(cell)

            }

            
        })
        .catch(error => console.log('error', error));
})
