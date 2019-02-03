import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
const Filter = (props) => {
  return(
    <form>
      <div>find countries<input value={props.newShowCriteria} 
        onChange={props.showListener}/>
      </div>
    </form>
  )
}
const Country = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>population {props.population}</p>
      <h3>languages</h3>
      <ul>{props.languages.map(language => <li>{language.name}</li>)}</ul>
      <img src={props.flag} height="192" width="242"/>
      <br/><br/><br/>
    </div>
    
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newShowCriteria, setNewShowCriteria] = useState('')
  const matches = countries.filter(country => country.name.toLowerCase().includes(newShowCriteria.toLowerCase())).length
  console.log(matches)
  const countriesToShow = showAll 
  ? countries 
  : countries.filter(country => country.name.toLowerCase().includes(newShowCriteria.toLowerCase()))
  const CountryDisplayFormat = (props) => {
    if (props.matches > 10){
      return (
        <div>too many matches, specify another filter</div>
      )
    } else if (props.matches >1){
      return(
        <div>
          <ul>
            {props.countries.map(country=> <div>{country.name}<DisplayButton country={country}/><br/></div>)}
          </ul>
        </div>
      )
    } else if (props.matches === 1){
      return (
      <div><Country name={props.countries[0].name}
        capital={props.countries[0].capital}
        population={props.countries[0].population}
        languages={props.countries[0].languages}
        flag = {props.countries[0].flag}/>
      </div>
      )
    } else {
      return (<div>no matches found</div>)
    }
  }  

  const DisplayButton = (props) => {
    return(
      <div>
        <button onClick={(()=> 
        setNewShowCriteria(props.country.name))}> show </button>
      </div>
    )
  }

  useEffect(()=> {
    const request = axios.get('https://restcountries.eu/rest/v2/all')
    request.then(response=> setCountries(response.data))
  
    console.log(countries)
    console.log(request)
    }, [])
    
    
  const showListener = (event) => {
    console.log(event.target.value)
    setNewShowCriteria(event.target.value)
    if (event.target.value === ('')) setShowAll(true)
    else setShowAll(false)
  }
 
  console.log(axios.get('https://restcountries.eu/rest/v2/all'))
    
  
  return (
    <div>
      <h1>countrylist</h1>
      <Filter newShowCriteria={newShowCriteria} showListener={showListener}/>
      <CountryDisplayFormat matches={matches} countries={countriesToShow}/>
    
    </div>
     
  
  )

}




export default App;
