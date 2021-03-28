import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
  if (!weather.weather_descriptions) {
    return (
      <p>No weather today!</p>
    )
  }
  
  return (
    <div>
      weather is 
      <ul>
        {weather.weather_descriptions.map(description => (<li key={description}>{description}</li>))}
      </ul>
      {weather.weather_icons.map(icon => (<img key={icon} src={icon}/>))}
    </div>
  )
}

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({})

  const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`

    console.log(url)

    axios
      .get(url)  
      .then(response => {        
        console.log("weather response", response.data)
        setWeather(response.data.current)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages:</h2>
      <ul>
      {country.languages.map(
        language => (<li key={language.name}>{language.name}</li>)
      )}
      </ul>
      <img src={country.flag} alt="Flag of {country.name}" width="10%"/>
      <Weather weather={weather}/>
    </div>
  )
}

const CountryShort = ({ country }) => {
  const [detailFlag, setDetailFlag] = useState(false)

  const hideDetail = () => {
    setDetailFlag(false)
  }

  const showDetail = () => {
    setDetailFlag(true)
  }

  if (detailFlag) {
    return (
      <div>
        <CountryDetail country={country}/>
        <button onClick={hideDetail}>hide</button>
      </div>
    )
  }

  return (
    <p>
      {country.name} <button onClick={showDetail}>show</button>
    </p>
  )
}


const CountryList = (props) => {
  const filteredCountries = props.countries.filter(
    country => (country.name.toUpperCase().indexOf(props.filterBy.toUpperCase()) !== -1)
  )
  if(filteredCountries.length > 10) {
    return (
      <div>Too many matches, please specify another filter</div>
    )
  }
  if(filteredCountries.length === 0) {
    return (
      <div>No matches, please specify another filter</div>
    )    
  }
  if(filteredCountries.length === 1) {
    return (
      <CountryDetail country={filteredCountries[0]} />
    )
  }
  return (
    <div>
      {filteredCountries.map(country => (<CountryShort key={country.alpha2Code} country={country} />))}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
          filter countries with: <input onChange={props.handleFilterBy} value={props.filterBy}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
 
  const [ filterBy, setFilterBy ] = useState('')

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {        
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter handleFilterBy={handleFilterBy} filterBy={filterBy}/>      
      <CountryList countries={countries} filterBy={filterBy}/>
    </div>
  )

}

export default App