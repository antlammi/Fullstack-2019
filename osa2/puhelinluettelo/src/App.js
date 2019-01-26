import React, { useState } from 'react'
const Person = (props) => {
  return(
  <div>
    <li>{props.name} {props.number}</li>
  </div>
  )
}
const Filter = (props) => {
  return (
    <form>
        <div>rajaa näytettäviä<input value={props.newShowCriteria} 
        onChange={props.showListener}/></div>
      </form>
  )
}
const PersonForm = (props) => {
  return(
    <div>
      <h3>lisää uusi</h3>
      <form onSubmit = {props.addPerson}>
        <div>
          nimi: <input value ={props.newName} onChange={props.nameListener}/>
        </div>
        <div>
          numero: <input value={props.newNumber} onChange={props.numberListener}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
        
      </form>
    </div>
  )
}

const Persons = ({personsToShow}) => {
  return(
    <div>
      <h2>Numerot</h2>
      <ul>
        {personsToShow.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
      </ul>
    </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newShowCriteria, setNewShowCriteria] = useState('')
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newShowCriteria.toLowerCase()))
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(persons)
    console.log(personObject)
    if (persons.map(person=> person.name).includes(newName)){
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const nameListener = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numberListener = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const showListener = (event) => {
    console.log(event.target.value)
    setNewShowCriteria(event.target.value)
    if (event.target.value === ('')) setShowAll(true)
    else setShowAll(false)
  }
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter newShowCriteria={newShowCriteria} 
        showListener={showListener}/>
        
      <PersonForm addPerson={addPerson} 
        newName={newName} nameListener={nameListener} 
        newNumber={newNumber} numberListener={numberListener}
      />
     <Persons personsToShow={personsToShow}/>
      
    </div>
  )

}

export default App