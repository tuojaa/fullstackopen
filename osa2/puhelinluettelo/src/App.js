import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deleteClicked }) => {
  return (
    <p>
      {person.name}  {person.number} <button onClick={deleteClicked}>delete</button>
    </p>
  )
}

const Phonebook = (props) => {
  const filteredPersons = props.persons.filter(
    person => (person.name.toUpperCase().indexOf(props.filter.toUpperCase()) !== -1)
  )
  return (
    <div>
      {filteredPersons.map(person => (<Person key={person.name} person={person} deleteClicked={() => props.deletePerson(person.id)} />))}
    </div>
  )
}

const AddNewForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  ) 
}

const Filter = (props) => {
  return (
    <div>
          filter shown with: <input onChange={props.handleFilterBy} value={props.filterBy}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [ newNumber, setNewNumber ] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,      
      number: newNumber,
    }    

    const existingIndex = persons.findIndex(person => (person.name===newName))

    if(existingIndex !== -1) {      
      personService.updatePerson(persons[existingIndex].id, personObject)
        .then(response => {
          const newPersons = [...persons]
          newPersons[existingIndex] = personObject
          setPersons(newPersons)
        })
        .catch(error => {
          alert("Tietojen päivitys epäonnistui")
          console.log("updatePerson failed", error)      
        })
    
      return
    }

    personService.createPerson(personObject)
      .then(response => {        
        setPersons(persons.concat(response.data))    
        setNewName('')
        setNewNumber('')    
      })
      .catch(error => {
        alert("Tietojen tallennus epäonnistui")
        console.log("createPerson failed", error)
      })
  }

  const [ filterBy, setFilterBy ] = useState('')

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value)
  }

  useEffect(() => {
    personService.getAllPersons()
      .then(response => {        
        setPersons(response.data)
      })
      .catch(error => {
        alert("Tietojen haku epäonnistui!")
        console.log("getAllPersons failed", error)
      })
  }, [])

  const deletePerson = (id) => {
    personService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter((person) => (person.id!==id)))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterBy={handleFilterBy} filterBy={filterBy}/>
      <h2>Add new</h2>
      <AddNewForm 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filterBy} deletePerson={deletePerson} />
    </div>
  )

}

export default App