import React from 'react';
import personService from './services/persons'
//import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
            ],
            newName: '',
            newNumber: '',
            myFilter: ''
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

        //Check if name exists
        if (this.state.persons.some(item => item.name === this.state.newName)) {
            if (window.confirm(`${this.state.newName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
                console.log("Name exists, replace")
                
                const personObject = {
                    name: this.state.newName,
                    number: this.state.newNumber
                }
                const id = this.getPersonId(this.state.newName)
                personService
                    .update(id, personObject)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.map(item => item.id !== id ? item : personObject),
                            newName: '',
                            newNumber: ''
                        })
                    })
                return
            } else {
                console.log("Name exists, do not replace")
                return
            }
        } else {
            // Name does not exist, create new entry

            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }

            // Send the added number to the server and update view with response.
            personService
                .create(personObject)
                .then(person => {
                    this.setState({
                        persons: this.state.persons.concat(person),
                        newName: '',
                        newNumber: ''
                    })
                })
        }
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

    getPersonName = (id) => {
        return this.state.persons.find(item => item.id === id).name
    }

    getPersonId = (name) => {
        return this.state.persons.find(item => item.name === name).id
    }

    handleRemove = (event) => {
        const id = parseInt(event.target.value, 10)
        const personName = this.getPersonName(id)

        console.log(`Confirm remove id ${id}: ${personName}`)
        if (window.confirm(`Poistetaanko ${personName} luettelosta?`)) {
            // request remove from server
            personService
                .remove(event.target.value)
                .then(response => {
                    console.log("Remove status:" + response.statusText)
                    if (response.status === 200) {
                        //remove from view
                        this.setState({
                            persons: this.state.persons.filter(item => item.id !== id)
                        })
                    }
                })
        } else {
            console.log("Canceled.")
        }
    }

    nimilista = () => this.state.persons
        .filter(item => item.name.toUpperCase().indexOf(this.state.myFilter.toUpperCase()) !== -1)
    //.map(item => <Person key={item.name} person={item} />)

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>

                Rajaa näytettäviä: <input value={this.state.myFilter} onChange={this.handleFilter} />

                <AddNumber
                    action={this.addPerson}
                    nameValue={this.state.newName}
                    nameHandler={this.handleNameChange}
                    numberValue={this.state.newNumber}
                    numberHandler={this.handleNumberChange} />

                <ShowNumbers
                    persons={this.nimilista()}
                    removeHandler={this.handleRemove} />
            </div>
        )
    }
}

const AddNumber = (props) => {
    return (
        <form onSubmit={props.action}>
            <h2>Lisää uusi</h2>
            <table>
                <tbody>
                    <tr>
                        <td>nimi:</td>
                        <td><input
                            value={props.nameValue}
                            onChange={props.nameHandler} /></td>
                    </tr>
                    <tr>
                        <td>numero:</td>
                        <td><input
                            value={props.numberValue}
                            onChange={props.numberHandler} /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">lisää</button>
        </form>
    )
}

const ShowNumbers = (props) => {
    const tableRows = props.persons.map(
        item => <Person key={item.name} person={item} removeAction={props.removeHandler} />
    )

    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {tableRows}
            </tbody>
            </table>
        </div>
    )
}

const Person = (props) =>
    <tr>
        <td>{props.person.name}</td>
        <td>{props.person.number}</td>
        <td><button value={props.person.id} onClick={props.removeAction}>poista</button></td>
    </tr>

export default App