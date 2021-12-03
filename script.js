const weatherFunc = (() => {

  const getCityInput = () => {
    const cityName = document.querySelector("#cityName").value.toLowerCase();
    return cityName
  }

  const generateApiAdress = () => {
    const apiAdress = `//api.openweathermap.org/data/2.5/weather?q=${getCityInput()}&units=metric&appid=18a8e24e2450fe824737018d53c4175a`
    return apiAdress
  }

  const apiCall = async () => {
    try {
      const response = await fetch(generateApiAdress(), {mode: 'cors'});
      const data = await response.json();
      const usefulInfo = {
        name: data.name,
        realTemp: data.main.temp,
        feelTemp: data.main.feels_like,
        country: data.sys.country,
        cloudType: data.weather[0].description
      }

      return usefulInfo;

    } catch (err) {
      alert("Plese enter a valid city name")
      console.log("The api call went wrong")
    }
  }

  const populateData = async () => {
    const myData = await apiCall();
    const body = document.querySelector("body");
    const domParent = document.querySelector("#results-wrapper");
    while (domParent.firstChild) {
      domParent.firstChild.remove();
    }
    let rowTitle;
    let rowInfo;
    for (let i = 0; i < Object.keys(myData).length; i++) {
      let domElement = document.createElement("div")
      switch (Object.keys(myData)[i]) {
        case "name":
          rowTitle = 'City name';
          rowInfo = myData.name;
          break;
        case "realTemp":
          rowTitle = 'Real temperature';
          rowInfo = myData.realTemp;
          break;
        case "feelTemp":
          rowTitle = 'Thermal sensation';
          rowInfo = myData.feelTemp;
          break;
        case "country":
          rowTitle = "Country";
          rowInfo = myData.country;
          break;
        case "cloudType":
          rowTitle = "Type of cloud";
          rowInfo = myData.cloudType[0].toUpperCase() + myData.cloudType.substring(1);
          break;
      }
      domElement.innerHTML = `
      <div class="row row-cols-2 align-self-center">
        <div class="col"><strong>${rowTitle}</strong></div>
        <div class="col">${rowInfo}</div>
      </div>
      `
      domParent.appendChild(domElement)
    }
  }

  return {
    populateData
  }
})();

(function () {
  document.querySelector("button").addEventListener('click',weatherFunc.populateData);
})();

