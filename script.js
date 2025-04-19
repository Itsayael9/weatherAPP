// Fixed JavaScript (script.js)
function getWeather() {
    const apiKey = '54edcf65e3a23016ada20f2f0167b130';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city. It should not be empty.');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list); 
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForcastDiv = document.getElementById('hourly-forecast');

    // Clear previous content 
    weatherInfoDiv.innerHTML = '';
    hourlyForcastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    
    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
        
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconURL; 
        weatherIcon.alt = description; 

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForcastDiv = document.getElementById('hourly-forecast');
    
    // Add a heading for the hourly forecast
    hourlyForcastDiv.innerHTML = '<h3 id="hourly-heading">24 Hour Forecast</h3>';
    
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconURL}" alt="hourly weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;
        
        hourlyForcastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}