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
                persons: persons,
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
        .map(item => <Person key={item.name} person={item} />)

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                Rajaa näytettäviä: <input value={this.state.myFilter} onChange={this.handleFilter} />
                <form onSubmit={this.addPerson}>
                    <div>
                    <h2>Lisää uusi</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>nimi:</td>
                                    <td><input
                                        value={this.state.newName}
                                        onChange={this.handleNameChange} /></td>
                                </tr>
                                <tr>
                                    <td>numero:</td>
                                    <td><input
                                        value={this.state.newNumber}
                                        onChange={this.handleNumberChange} /></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>

                <table><tbody>
                    {this.nimilista()}
                </tbody></table>
            </div>
        )
    }
}

const Person = (props) => <tr><td>{props.person.name}</td><td>{props.person.number}</td></tr>

export default App