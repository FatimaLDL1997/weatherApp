import "./App.css";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import image from "http://openweathermap.org/img/wn/01n@2x.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [unitType, setUnitType] = useState("metric");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitType}&appid=0599f609d420cd6cb689ad45c875ab18`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      // setLocation("");
    }
  };
  console.log(unitType);

  useEffect(() => {
    console.log("changed units");
    setLocation(location);
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [unitType]);

  return (
    <Wrapper>
      <div className='app'>
        <div className='search'>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder='Enter Location'
            type='text'
          />
        </div>
        <div className='container'>
          {data.main && (
            <div className='img'>
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=''
              />
            </div>
          )}
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
              {data.main ? (
                <>
                  <h1>
                    {Math.round(data.main.temp)}
                    {unitType == "metric" ? "°C" : "°F"}
                  </h1>

                  <div className='unit-btns'>
                    <button
                      className='btn'
                      onClick={() => {
                        setUnitType("metric");
                      }}
                      style={{ color: unitType == "metric" ? "white" : "grey" }}
                    >
                      °C
                    </button>
                    <h4 className='devider'>__</h4>
                    <button
                      className='btn'
                      onClick={() => {
                        setUnitType("imperial");
                      }}
                      style={{
                        color: unitType == "imperial" ? "white" : "grey",
                      }}
                    >
                      °F
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            <div className='description'>
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name != undefined && (
            <div className='bottom'>
              <div className='feels'>
                {data.main ? (
                  <p className='bold'>
                    {data.main ? Math.round(data.main.feels_like) : null} °C
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {data.main ? (
                  <p className='bold'>{data.main.humidity} %</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.main ? (
                  <p className='bold'>
                    {Math.round(data.wind.speed * 3.6)} KMPH
                  </p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .img {
    width: 100%;
    position: relative;
    height: 10% !important;
    z-index: 1;
    left: -1rem;
  }
  .devider {
    text-align: center;
    color: grey;
    display: flex;
    justify-content: flex-end;
  }
  .temp {
    display: flex;
    flex-direction: row;
  }
  .unit-btns {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-left: 1rem;
  }
  .btn {
    background: none;
    border: none;
    // color: white;
    font-size: 1.5rem;
    line-height: fit-content;
  }
  .btn:first-child {
    padding-top: 1rem;
  }
  .btn:last-child {
    padding-top: 1rem;
  }
  .btn:hover {
    cursor: pointer;
    color: white !important;
  }
  .container {
    max-width: 700px;
    height: 700px;
    margin: auto;
    padding: 0 1rem;
    position: relative;
    top: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .app .top {
    width: 100%;
    margin: 1rem auto;
  }

  .app .description {
    position: relative;
    right: -90%;
    transform-origin: 0 0;
    transform: rotate(269deg);
  }

  .app .bottom {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .bold {
    font-weight: 700;
  }
`;
export default App;
