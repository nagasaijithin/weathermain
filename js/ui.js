class ui {
  constructor() {
    var self = this;
    this.getData = new getData();
    // data.getLocationOption();
    this.input = document
      .querySelector(".center form")
      .addEventListener("submit", function(e) {
        self.searchData(e.target.children[0].children[0].value);
        e.preventDefault();
      });
    this.mainimg = document.querySelector(".weathericon");
    this.clearinput = document.querySelector(".center form input");
    this.name = document.querySelector(".currentcity");
    this.tem = document.querySelector(".tem");
    this.weatherInfo = document.querySelector(".weather-info");
    this.localCity = document.querySelector(".expline-weather-1 .ani");
    this.liCitys = document.querySelector(".expline-weather-2 ul");
    this.lodear1 = document.querySelector(".expline-weather-1 .lodear");
    this.lodear2 = document.querySelector(".expline-weather-2 .lodear");
    this.searchlocationButton = document
      .querySelector(".search-for-location-btn")
      .addEventListener("click", function(e) {
        this.previousElementSibling.value
          ? self.searchData(this.previousElementSibling.value)
          : "";
        e.preventDefault();
      });
  }
  changeCurrentInfo() {
    this.clearinput.value
      ? (this.clearinput.value = "")
      : this.getData
          .getLocationOption(5)
          .then(data => data && this.section1(data));
  }

  section1(data) {
    if (data) {
      this.lodear1.style.visibility = "hidden";
      this.lodear1.style.opacity = "0";
      this.localCity.style.visibility = "visible";
    }

    var h4 = ` <h4 class="city">${data.list[0].name}<span class="state">,${data.list[0].sys.country}</span></h4>`;
    this.name.innerHTML = h4;

    var img = `<img src="./img/${data.list[0].weather[0].icon}.svg" alt="">`;
    this.mainimg.innerHTML = img;

    var tempToCelsius = Math.round(data.list[0].main.temp - 273.15);
    this.tem.innerHTML = `<h2>${tempToCelsius}ºC</h2>`;

    var wind = Math.round(data.list[0].wind.speed * 3.6);
    var humidity = data.list[0].main.humidity;
    var wInfo = `
        <h3 class="humidity">Humidity : <span class="p-value">${humidity}</span> <span clss="parst">%</span> </h3>
        <h3 class="wind">Wind : <span class="p-value">${wind}</span> <span clss="km/h">km/h</span> </h3>
    `;
    this.weatherInfo.innerHTML = wInfo;
    this.section2(data);
  }

  section2(datas) {
    if (datas) {
      this.lodear2.style.visibility = "hidden";
      this.lodear2.style.opacity = "0";
      this.liCitys.style.visibility = "visible";
    }

    var citys = "";
    datas.list.forEach(data => {
      var tempToCelsius = Math.round(data.main.temp - 273.15);
      citys += `
            <li class="li_cityname">
                <h3>${data.name}<span class="state">,${data.sys.country}</span></h3>    
                <span>${tempToCelsius}ºC</span>
                <img src="./img/${data.weather[0].icon}.svg" alt="">
            </li>
            `;
    });
    this.liCitys.innerHTML = citys;
  }
  searchData(value) {
    this.getData
      .searchingCity(value)
      .then(rdata => this.searchingShowData(rdata));
  }

  searchingShowData(data) {
    this.searchReplace1(data);
  }

  searchReplace1(data) {
    if (data) {
      this.lodear2.style.visibility = "hidden";
      this.lodear2.style.opacity = "0";
      this.liCitys.style.visibility = "visible";
      this.lodear1.style.visibility = "hidden";
      this.lodear1.style.opacity = "0";
      this.localCity.style.visibility = "visible";
    }

    var h4 = ` <h4 class="city">${data.name}<span class="state">,${data.sys.country}</span></h4>`;
    this.name.innerHTML = h4;

    var img = `<img src="./img/${data.weather[0].icon}.svg" alt="">`;
    this.mainimg.innerHTML = img;

    var tempToCelsius = Math.round(data.main.temp - 273.15);
    this.tem.innerHTML = `<h2>${tempToCelsius}ºC</h2>`;

    var wind = Math.round(data.wind.speed * 3.6);
    var humidity = data.main.humidity;
    var wInfo = `
            <h3 class="humidity">Humidity : <span class="p-value">${humidity}</span> <span clss="parst">%</span> </h3>
            <h3 class="wind">Wind : <span class="p-value">${wind}</span> <span clss="km/h">km/h</span> </h3>
        `;
    this.weatherInfo.innerHTML = wInfo;
    this.takingsearchReplace2(data.coord.lat, data.coord.lon, 5);
  }
  takingsearchReplace2(lat, lon, cnt) {
    this.getData
      .renderData(lat, lon, cnt)
      .then(rdata => this.searchReplace2(rdata));
  }
  searchReplace2(datas) {
    var citys = "";
    datas.list.forEach(data => {
      var tempToCelsius = Math.round(data.main.temp - 273.15);
      citys += `
            <li class="li_cityname">
                <h3>${data.name}<span class="state">,${data.sys.country}</span></h3>    
                <span>${tempToCelsius}ºC</span>
                <img src="./img/${data.weather[0].icon}.svg" alt="">
            </li>
            `;
    });
    this.liCitys.innerHTML = citys;
  }
}

var UI = new ui();
UI.changeCurrentInfo();
