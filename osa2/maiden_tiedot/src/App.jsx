import { useState, useEffect } from 'react'
import countriesService from './services/countries'

function App() {
  const [text, setText] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  

  useEffect(() => {
    countriesService
      .getAll()
      .then(country => 
        setCountries(country)
      )
  }, [])

  const setDetailedInformation = (country) => {
    countriesService
      .getOne(country.toLowerCase())
      .then(details => setCountryDetails(details))
      .catch(error => console.error("Error fetching country details", error));
  }

  const setCountriesInformation = (event) => {
    const countriesList = countries.map(country => country.name.common)
    const userValue = event.target.value.toLowerCase()
    const matches = countriesList.filter(country => country.toLowerCase().includes(userValue))
    setSelectedCountries([])
    setCountryDetails(null)

    if (matches.length === 1) {
      setDetailedInformation(matches[0])
    } else if (matches.length < 10) {
      setSelectedCountries(matches)
      setText('')
    } else if (matches === 0) {
      setText('No matches')
    } else {
      setText('Too many matches, specify another filter')
    }
  }

  const clickHandler = (event) => {
    setDetailedInformation(event.target.value)
  } 

  return (
    <>
      <div>
        input: <input placeholder='write a country...' onChange={setCountriesInformation}/>
      </div>
      <p>{text}</p>
      <div>
        {selectedCountries.map(country => 
          <p>{country} <button onClick={clickHandler} value={country}>show</button></p>
        )}
        {countryDetails && (
          <>
            <h2>{countryDetails.name.common}</h2>  
            <p>Capital {countryDetails.capital}</p>
            <p>area: {countryDetails.area}</p>
            <p>Location: {countryDetails.subregion}</p>
            <p>Population: {countryDetails.population}</p>
            
            <h3>Languages:</h3>
            <ul>
              {Object.entries(countryDetails.languages).map(([key, value]) => 
                <li key={key}>{value}</li>
              )}
            </ul>
            <img src={countryDetails.flags.png} />
          </> 
        )}
      </div>
    </>
  )
}

export default App
