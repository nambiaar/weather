import React, { useMemo, useEffect, useState, useCallback } from "react";
import { save } from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import './App.scss';
import {
  DAYS_TO_FORECAST, API_URL, API_KEY, API_KEY_PARAM, PLACE_HOLDER,
  DEFAULT_PARAMS, LOCATION_PARAM, DAYS_PARAM, CURRENT_DATA, FORECAST_DATA,
  APP_TITLE, PREV_SEARCH_TEXT,
} from "./constants";
import { formatFutureDate } from './utils';
import Card from './components/Card';


const App = () => {
  const data = useSelector(state => state.value);

  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const locs = window.localStorage.getItem('locations');
    if (locs) {
      const storageLocs = JSON.parse(locs)
      if (storageLocs?.length) {
        setCurrentLocation(storageLocs[0]);
        setLocations(storageLocs);
      }
    }
    return () => {
      window.localStorage.setItem('locations', JSON.stringify(locations));
    }
  }, []);

  useEffect(() => {
    if (data && data.location) {
      const currentLocations = locations.slice();
      currentLocations.unshift(data?.location?.name);
      const locationSet = new Set(currentLocations);
      setLocations(Array.from(locationSet));
      window.localStorage.setItem('locations', JSON.stringify(Array.from(locationSet)));
    }
  }, [data])

  const dayPlusXForecast = useMemo(() =>
    new Array(DAYS_TO_FORECAST).fill().map((_, i) => (
      data?.forecast?.forecastday.filter(daily => (
        daily.date === formatFutureDate(i)
      ))
    )), [data]);

  const removeLocation = (choice) => {
    setLocations(locations.filter(loc => loc !== choice))
    window.localStorage.setItem('locations', JSON.stringify(locations));
  };

  const getData = () => {
    const url = API_URL +
      `?${API_KEY_PARAM.replace(PLACE_HOLDER, API_KEY)}` +
      `&${LOCATION_PARAM.replace(PLACE_HOLDER, currentLocation)}` +
      `&${DAYS_PARAM.replace(PLACE_HOLDER, DAYS_TO_FORECAST + 1)}` +
      DEFAULT_PARAMS;

    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(save(data)))
      .catch((error) => {
        console.error('error!', error)
      });
  };

  return (
    <div className="App" data-testid="App">
      <h1>
        {APP_TITLE}
      </h1>
      <div className="body">
        <div className="search">
          <div className="search-box">
            <input
              className="zip-input"
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />
            <button onClick={getData}>Show</button>
          </div>
          <div className="search-history">
            {data && <div>{PREV_SEARCH_TEXT}</div>}
            {locations && locations.length && locations.map(loc => (
              <div>
                <label htmlFor={loc}>
                  <input type="radio"
                    id={loc}
                    value={loc}
                    checked={loc === currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    onClick={getData}
                  />
                  {loc}
                </label>
                <button className="delete" onClick={() => removeLocation(loc)}>X</button>
              </div>
            ))}
          </div>
        </div>
        {data && (
          <>
            <Card data={data?.current} description={CURRENT_DATA} size="large" />
            <div className="forecast">
              {dayPlusXForecast.map(forecast => (
                <Card
                  data={forecast}
                  size="small"
                  key={forecast?.date}
                  description={FORECAST_DATA}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default App;
