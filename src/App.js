import React, { useState, useEffect } from "react";
import './App.css';
import img from './Images/cloudy.png';


function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("durgapur");

  const fetchData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=478722882c6e69b8d13f836cc9cb2543`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        //console.log(res);
        setData(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData();
  }, [search])

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);


  return (
    <div className="App">

      <main id="container">
        <div className="weather">
          <div className="city" id="location">
            <input type="search" placeholder="Enter City Name" className="input" onChange={(event) => { setSearch(event.target.value) }} />
            <p id="loc">{search} </p>
          </div>
          <div>
            <div id="temp">
              <img id="temp-Icon" src={img} alt="weather" width="300px"></img>
              <p><span className="temeprature" id="temeprature">{loading ? "data is loading" : data.main.temp}</span><span id="temp-unit">°C</span></p>
            </div>
            <div id="hum">
              <p>Humidity: <span id="humidity">{loading ? "data is loading" : data.main.humidity}</span></p>
            </div>
          </div>
          <div className="time">
            <p>
              {dt}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
