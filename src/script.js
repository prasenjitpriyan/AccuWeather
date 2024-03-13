const apiKey = "041beb2206bf37c4d940d5e0c74fe760";
const lat = 22.572645
const lon = 88.363892

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getWeather()
  .then(data => {
    console.log(data);

    document.querySelector('.logo').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector('#weather').textContent = `${Math.floor(data.main.temp)}˚C`;
    document.querySelector('#location').textContent = `Location: ${data.name}`;

    document.querySelector('#text-1').textContent = `${data.main.humidity}%`
    document.querySelector('#text-2').textContent = `${Math.floor(data.main.feels_like)}˚C`
    const timezone = 19800
    const sunrise = `${data.sys.sunrise}`;
    const sunset = `${data.sys.sunset}`;
    let sunriseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm a');
    let sunsetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm a');
    document.querySelector('#text-3').textContent = sunriseTime;
    document.querySelector('#text-4').textContent = sunsetTime;

    document.querySelector("#wind-direction").textContent = `${data.wind.deg}˚`
    document.querySelector("#wind-speed").textContent = `${data.wind.speed}`
  })
  .catch(error => {
    console.error("Error fetching weather:", error);
  });

function getFormattedTime(useSeconds = false) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let convertedHours = hours % 12 || 12;
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const formattedTime = `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;

  if (useSeconds) {
    formattedTime += `:${seconds.toString().padStart(2, '0')}`;
  }
  return formattedTime;
}

const currentTime = getFormattedTime();
document.querySelector("#time").textContent = currentTime;