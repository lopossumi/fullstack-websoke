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
        console.log('clickclack')
    }

    nimilista = () => this.state.persons.map(
        item => <Person key = {item.name} person={item} />
    )

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input />
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