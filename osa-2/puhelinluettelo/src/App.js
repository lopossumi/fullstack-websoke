import React from 'react';
import personService from './services/persons'

import Notification from './components/Notification'
import AddNumber from './components/AddNumber'
import ShowNumbers from './components/ShowNumbers'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            myFilter: '',
            error: null
        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personName = this.state.newName
        const personObject = {
            name: personName,
            number: this.state.newNumber
        }

        //Check if name exists
        if (this.state.persons.some(item => item.name === personName)) {
            console.log(`Name exists! Confirm replace number: ${personName}`)
            if (window.confirm(`${personName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {

                // Name exists: Replace number for old entry
                console.log(`Confirmed. Replacing number for ${personName}...`)
                const id = this.getPersonId(personName)
                personService
                    .update(id, personObject)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.map(item => item.id !== id ? item : personObject),
                            newName: '',
                            newNumber: ''
                        })
                        console.log(`Number replaced for ${personName}`)
                        this.showMessage(`Puhelinnumero vaihdettu henkilölle ${personName}.`)
                    })
                    .catch(error => {
                        // Meanwhile, number has been deleted from server. Remove it locally first, then add new entry.
                        console.log("Error: number not found on server. Removing local entry.")
                        this.setState({
                            persons: this.state.persons.filter(item => item.name !== personName)
                        })
                        this.addPersonObject(personObject)
                    })
                return
            } else {
                console.log("Canceled replace.")
                this.showMessage("Numeron vaihto peruutettu.")
            }
        } else {
            // Entry does not exist: create new entry.
            this.addPersonObject(personObject)
        }
    }

    addPersonObject = (personObject) => {
        personService
        .create(personObject)
        .then(person => {
            this.setState({
                persons: this.state.persons.concat(person),
                newName: '',
                newNumber: ''
            })
            console.log(`New entry: ${personObject.name}`)
            this.showMessage(`${personObject.name} lisätty luetteloon.`)
        })
        .catch(error => {
            console.log("Failed to create entry.")
            this.showMessage(`Henkilön lisääminen luetteloon ei onnistunut. Tarkista syöte.`)
        })
    }
    
    getPersonName = (id) => {
        return this.state.persons.find(item => item.id === id).name
    }

    getPersonId = (name) => {
        return this.state.persons.find(item => item.name === name).id
    }

    handleFilter = (event) => {
        this.setState({ myFilter: event.target.value })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    removePerson = (event) => {
        const id = event.target.value
        const personName = this.getPersonName(id)

        console.log(`Confirm remove id ${id}: ${personName}`)
        if (window.confirm(`Poistetaanko ${personName} luettelosta?`)) {
            console.log("Confirmed. Removing...")
            // Request remove from server
            personService
                .remove(event.target.value)
                .then(response => {
                    console.log("Remove status:" + response.statusText)
                    if (response.status === 204) {
                        // Remove from view
                        this.setState({
                            persons: this.state.persons.filter(item => item.id !== id)
                        })
                        console.log(`Removed: ${personName}`)
                        this.showMessage(`${personName} poistettu luettelosta.`)
                    }
                })
        } else {
            console.log("Canceled remove.")
            this.showMessage("Numeron poisto peruutettu.")
        }
    }

    showMessage = (text) => {
        this.setState({
            error: text
        })
        setTimeout(() => {
            this.setState({ error: null })
        }, 3000)
    }

    filteredList = () => this.state.persons
        .filter(item => item.name.toUpperCase().indexOf(this.state.myFilter.toUpperCase()) !== -1)
    //.map(item => <Person key={item.name} person={item} />)

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Notification
                    message={this.state.error} />

                Rajaa näytettäviä: <input value={this.state.myFilter} onChange={this.handleFilter} />

                <AddNumber
                    action={this.addPerson}
                    nameValue={this.state.newName}
                    nameHandler={this.handleNameChange}
                    numberValue={this.state.newNumber}
                    numberHandler={this.handleNumberChange} />

                <ShowNumbers
                    persons={this.filteredList()}
                    removeHandler={this.removePerson} />
            </div>
        )
    }
}

export default App