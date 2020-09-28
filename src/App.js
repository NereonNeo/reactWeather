import React, { useState } from "react";
import "./App.css";
const api = {
  key: "2f1dc37e80507ddbe9e6ccd28945bfa6",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});

  const search = (ev) => {
    if (ev.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setquery("");
          setweather(result);
          console.log(weather)
        });
    }
  };

  const datebuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm': 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
          {(typeof weather.main != 'undefined' ? (
            <div>
              <div>
               <div className="location-box">
                  <div className="location">{weather.name},{weather.sys.country}</div>
                       <div className="date">{datebuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                  <div className="temp">
                      {Math.round(weather.main.temp)}°С
                   </div>
                      <div className="weather">{weather.weather[0].main}</div>
                  </div>
                </div>
         
              </div>
          ) : (''))}
      </main>
    </div>
  );
}

export default App;
