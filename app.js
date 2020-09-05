// referencing all classes
const form = document.querySelector('.form');
const inputValue = document.querySelector('.inputvalue');
const errorMsg = document.querySelector('.error-msg');
const list = document.querySelector('.cities');
const clearSearch = document.querySelector('.clear-all');


const searchHistory = JSON.parse(localStorage.getItem("history")) || [];
searchHistory.forEach(element => {
  const {main, name, sys, weather } = element;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      // html markup
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-timezone" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp"><img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;

      list.prepend(li);
      li.innerHTML = markup;
});
  

// myApi Key
const api = "2c0726ae12d76be3ea5302389c002acd";


form.addEventListener("submit",  e => {
  e.preventDefault();
  let inputVal = inputValue.value;
  



  // if a city have been searched message
  const listItems = list.querySelectorAll(".weather-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //china,mx
      if (inputVal.includes(",")) {
        //china,mxxxxxx->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el.querySelector(".city-timezone span").textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-timezone").dataset.name.toLowerCase();
        }

      } else {
        //china
        content = el.querySelector(".city-timezone span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      errorMsg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-timezone span").textContent
      } ...otherwise be more specific by providing the country code as well 😩`;
      form.reset();
      return;
    }
  }

  // conversion from celsius to fehranite
  function c2f(K) {
    return Math.floor((main.temp * 9/5) + 32);
  }


  // changing of background for each weather description
  function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
      case 'Clear':
        document.querySelector('.city').style.backgroundimage = 'url(img/clear.jpg)';
        break;

      case 'Rain':
        document.querySelector('.city').style.backgroundimage = 'url(img/rain.jpg)';
        break;

      case 'Clouds':
        document.querySelector('.city').style.backgroundimage = 'url(img/clouds.jpg)';
        break;

      case 'Drizzle':
        document.querySelector('.city').style.backgroundimage = 'url(img/9QKgpuACjU.jpg)';
        break;

      case 'Mist':
        document.querySelector('.city').style.backgroundimage = 'url(img/9QKgpuACjU.jpg)';
        break;

      case 'Snow':
        document.querySelector('.city').style.backgroundimage = 'url(img/snow.jpg)';
        break;

      case 'Thunderstorm':
        document.querySelector('.city').style.backgroundimage = 'url(img/thunderstorm.jpg)';
        break;

      default:
        break;
      
    }
  }
  
  // weather-info-scetion
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const {main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      // push data of users to search history
      searchHistory.push(data);
      localStorage.setItem("history",JSON.stringify(searchHistory));



      // html markup
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-timezone" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp"><img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;

      list.prepend(li);
      li.innerHTML = markup;      
    })

    .catch(() => {
      errorMsg.textContent = "Type in the correct city"
    });
  errorMsg.textContent="";
  form.reset();
});








