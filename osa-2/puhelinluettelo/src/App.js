import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    addName = (event) => {
        event.preventDefault()

        //Check if name exists
        if (this.state.persons.map(item => item.name).indexOf(this.state.newName) >= 0) {
            this.setState({ newName: '' })
            alert("Nimi on jo luettelossa!")
        } else {

            const personObject = {
                name: this.state.newName
            }
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons: persons,
                newName: ''
            })
        }
    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    nimilista = () => this.state.persons.map(
        item => <Person key={item.name} person={item} />
    )

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi:
                        <input
                            value={this.state.newName}
                            onChange={this.handleNameChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>

                <ul>
                    {this.nimilista()}
                </ul>
            </div>
        )
    }
}

const Person = (props) => <li>{props.person.name}</li>

export default App