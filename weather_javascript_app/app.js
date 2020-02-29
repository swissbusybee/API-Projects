window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector('.temperature-description');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector('.temperature-section span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/c9076cd93bd5b1d1ed34d2435120e7ca/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {temperature, summary, icon} = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9)
          //Set Icon
          setIcons(icon, document.querySelector('.icon'));
          //Change Temp to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
