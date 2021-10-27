import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

//const isInitialMount = useRef(true);
function App() {
  let [isReady, SetIsReady] = useState(false);
  let [table, SetIsTable] = useState([]);

  const fetchForeCast = function () {
    fetch("WeatherForecast").then(response => {
      return response.json();
    }).then(forecast => {
      SetIsReady(true);
      SetIsTable(forecast);
    });
  }

  useEffect(() => {
    fetchForeCast();
  }, [])

  let renderForecastsTable = function (forecasts) {
    console.log(forecasts);
    return (
      <div className="App">
        <header className="App-header">
          <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {forecasts.map(forecast =>
                <tr key={forecast.date}>
                  <td>{forecast.date}</td>
                  <td>{forecast.temperatureC}</td>
                  <td>{forecast.temperatureF}</td>
                  <td>{forecast.summary}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <input onClick={() => { fetchForeCast(); }} type="button" value="Update" />
          </div>
        </header>

      </div>
    );
  }


  if (isReady === true) {
    return renderForecastsTable(table)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          loading....
        </p>
      </header>
    </div>
  );
}

export default App;
