// this funtion return promise
function getCurrentLocation(options) {
  //this option argument is a one of the part of getCurrentPosition paramiter
  return new Promise((resolve, reject) => {
    // resoleve return success and reject is return false
    navigator.geolocation.getCurrentPosition(
      resolve, // first one succes measage
      ({ code, message }) => {
        reject(
          Object.assign(new Error(message), { name: "PositionError", code })
        );
      }, // second one using form error handling
      options // this getCurrentPosition options
    );
  });
}

class getData {
  constructor() {
    this.coords;
    this.form = document
      .querySelector(".center form")
      .addEventListener("submit", this.searchDefalut);
  }

  async getLocationOption(cnt) {
    try {
      const data = await getCurrentLocation({
        enableHighAccuracy: true,
        // this are getCurrentPosition  defalut options
        maximumAge: 0
        // this are getCurrentPosition  defalut options its tell about time we put inegers values like milli secondes
      });
      this.coords = [data.coords.latitude, data.coords.longitude];
      return this.renderData(this.coords[0], this.coords[1], cnt);
    } catch {
      console.log("somthing is incurrect");
    }
  }

  async renderData(clati, clong, cnt) {
    let url = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/find?lat=${clati}&lon=${clong}&cnt=${cnt}&appid=92cae619e9bc27685050aeebb868248c`
    );
    let rdata = url.json();
    return rdata;
  }

  searchDefalut(e) {
    e.preventDefault();
  }

  async searchingCity(inputvalue) {
    var searchCity = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=92cae619e9bc27685050aeebb868248c`
    );
    var rdata = searchCity.json();
    return rdata;
  }
}

// http://api.openweathermap.org/data/2.5/find?lat=14.45&lon=79.99&cnt=9&appid=92cae619e9bc27685050aeebb868248c
