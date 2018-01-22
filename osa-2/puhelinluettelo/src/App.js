import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-234567' },
                { name: 'Arto Järvinen', number: '040-345678' },
                { name: 'Lea Kutvonen', number: '040-456789' }
            ],
            newName: '',
            newNumber: '',
            myFilter: ''
        }
    }

    addPerson = (event) => {
        event.preventDefault()

        //Check if name exists
        if (this.state.persons.map(item => item.name).indexOf(this.state.newName) >= 0) {
            this.setState({ newName: '' })
            alert("Nimi on jo luettelossa!")
        } else {

            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons,
                newName: '',
                newNumber: ''
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

                <ShowNumbers persons={this.nimilista()} />
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
        item => <Person key={item.name} person={item} />
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

const Person = (props) => <tr><td>{props.person.name}</td><td>{props.person.number}</td></tr>

export default App