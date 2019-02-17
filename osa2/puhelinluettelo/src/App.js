import React, { useState, useEffect } from 'react'
import './App.css'
import personService from './services/people'

const Person = (props) => {
  if (props.id === null) return <div></div>
  return(
  <div>
    <li>{props.name} {props.number} <button onClick={(() => 
      props.removePerson(props.id))}>poista</button></li>
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

const Persons = ({personsToShow, removePerson}) => {
  return(
    <div>
      <h2>Numerot</h2>
      <ul>
        {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} removePerson={removePerson} id={person.id}/>)}
      </ul>
    </div>
  )
}
const ErrorNotification = ({message})=> {
  if (message===null){
    return null
  }
  return (
    <div className ="error-notification">
      {message}
    </div>
  )
}
const Notification = ({message}) => {
  if (message === null){
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newShowCriteria, setNewShowCriteria] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorNotificationMessage, setErrorNotificationMessage] = (useState(null))
  useEffect(()=> {
    personService.getAll()
    .then(initialPersons => {
      setPeople(initialPersons)
    })
  }, [])
  const updatePerson = (id, personObject) => {
    
    personService.update(id, personObject)
    .then(returnedPerson => {
      setPeople(people.map(person => person.id !== id 
        ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Päivitettiin henkilön ${personObject.name} tiedot.`)
      setTimeout(()=> {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(error => {
      setPeople(people.filter(person => person.id !== id))
      setErrorNotificationMessage(`Henkilö ${personObject.name} oli poistettu`)
      setNotificationMessage(null)
      setTimeout(()=> {
        setErrorNotificationMessage(null)
      }, 5000)
    })
     
  }
  const personsToShow = showAll 
  ? people 
  : people.filter(person => person.name.toLowerCase().includes(newShowCriteria.toLowerCase()))
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (people.map(person=> person.name).includes(newName)){
      var person = people.filter(person=>person.name===newName)[0]
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)){
       
        console.log(person, person.id, personObject)
        updatePerson(person.id, personObject)
       } 
      
    } else {
      personService
      .create(personObject)
      .then(returnedPerson=> {
        setPeople(people.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Lisättiin ${personObject.name}`)
        setErrorNotificationMessage(null)
      }).catch(error => {
        setErrorNotificationMessage(JSON.stringify(error.response.data))
        setNotificationMessage(null)
      })
    }
  }
  const removePerson = id => {
    console.log(id)
    const person = people.find(n => n.id === id)
    console.log(person)
    if (window.confirm(`Poistetaanko ${person.name}?`)){
      personService.remove(id)
      .then(setPeople(people.filter(person => person.id !== id)))
      setNotificationMessage(`Henkilö ${person.name} poistettu`)
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
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorNotificationMessage} />
      <Filter newShowCriteria={newShowCriteria} 
        showListener={showListener}/>
        
      <PersonForm addPerson={addPerson} 
        newName={newName} nameListener={nameListener} 
        newNumber={newNumber} numberListener={numberListener}
      />
     <Persons personsToShow={personsToShow} removePerson={removePerson}/>
      
    </div>
  )

}

export default App