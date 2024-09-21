import './App.css';
import { useEffect, useState } from 'react';

const api = {
  key: 'fe4feefa8543e06d4f3c66d92c61b69c',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const initialimage = `url(https://media.istockphoto.com/id/919833976/vector/cloudscape-blue-sky-with-clouds-and-sun-paper-art-style.jpg?s=612x612&w=0&k=20&c=A-YAPSQMi1hEUTbXatLQ2QTBThXJGI7lB-kycAPWTL8=)`

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(initialimage);

  const fetchWeatherData = (city) => {
    const normalizedCity = city.toLowerCase();
    const cachedData = localStorage.getItem(normalizedCity);

    if (cachedData) {
      setWeather(JSON.parse(cachedData));
    } else {
      fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod === 200) {
            setWeather(result);
            // Cache the data
            localStorage.setItem(normalizedCity, JSON.stringify(result));
          } else {
            alert('City not found');
          }
        })
        .catch(error => {
          alert('Error fetching weather data:', error);
        });
    }
  };

  const SearchPress = (e) => {
    e.preventDefault();
    if (search === '') {
      alert('Enter city/town name');
      return;
    }
    fetchWeatherData(search); // Fetch weather data on button click
  }

  const setBackgroundImageByWeather = () => {
    if (weather.weather && weather.weather.length > 0) {
      const mainWeather = weather.weather[0].main.toLowerCase();
      let imageUrl = '';

      switch (mainWeather) {
        case 'clear':
          imageUrl = 'url(https://images.unsplash.com/photo-1691848748531-02f797afa3c8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
          break;
        case 'rain':
          imageUrl = 'url(https://media.istockphoto.com/id/520773327/photo/caution-heavy-rain.webp?b=1&s=170667a&w=0&k=20&c=96b4ZNe6Zy_Ao-PecyhpR-DdqTCR_F65s0cKE3r0vxc=)';
          break;
        case 'clouds':
          imageUrl = 'url(https://images.unsplash.com/photo-1562155955-1cb2d73488d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
          break;
        case 'thunderstorm':
          imageUrl = 'url(https://plus.unsplash.com/premium_photo-1664298006973-e98eb94d006c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
          break;
        case 'haze':
          imageUrl = 'url(https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg)';
          break;
        case "snow":
          imageUrl = `url(https://img.freepik.com/free-photo/3d-snowy-landscape_1048-9385.jpg)`;
          break;
        case "smoke":
          imageUrl = `url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjgaoRu6tKkXt9tj3aqBdeObBH54VH77LQ6Cuq0YP9ejJ_WKOwaF-IxBDy172bFEBJ0Vsyrh8bXEkntz02HfxDoELkFI47-cavgSi6kj6Bo3OVdAjrUjnGYfHmYMQ0o-8ARUSOsbYU_ct8/s1600/Screen+Shot+2020-09-11+at+9.16.03+AM.png)`;
          break;
        default:
          imageUrl = 'url(https://t3.ftcdn.net/jpg/04/40/06/92/360_F_440069273_2lStitbQvoaYnzBJyO1PxBqjPbdFOMeH.jpg)';
          break;
      }

      setBackgroundImage(imageUrl);
    }
  };

  useEffect(() => {
    setBackgroundImageByWeather();
  }, [weather]);

  return (
    <div style={{ backgroundImage: backgroundImage }} className='container'>
      <header className='insidecontainer'>
        <h1>Weather App</h1>
        <div className='insiderrtow'>
          <input
            type='text'
            placeholder='Enter city/town name'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={SearchPress}>Search</button>
        </div>
        <div className='lowerpart'>
          {weather.name ? (
            <div className='lowertwo'>
              <p>{weather.name}</p>
              <p>{weather.main?.temp ? `${(weather.main.temp - 273.15).toFixed(2)}°C` : ""}</p>
              <p>{weather.weather[0].main}</p>
            </div>
          ) : (
            <p>Enter city/town name</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
