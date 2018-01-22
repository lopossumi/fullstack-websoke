import React from 'react';

import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allCountries: [],
            myFilter: '',
            myFilteredCountries: []
        }
    }

    filteredCountries = (flt) => this.state.allCountries
        .filter(item => item.name.toUpperCase().indexOf(flt.toUpperCase()) !== -1)

    componentWillMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ allCountries: response.data })
            })
    }

    handleFilter = (event) => {
        console.log(event.target.value)
        this.setState({
            myFilter: event.target.value,
            myFilteredCountries: this.filteredCountries(event.target.value)
        })
    }

    render() {
        return (
            <div>
                <h1>Les Countrees</h1>
                Find countries: <input value={this.state.myFilter} onChange={this.handleFilter} />

                <ShowCountries myCountries={this.state.myFilteredCountries} />

            </div>
        )
    }
}

const ShowCountries = (props) => {
    const numberOfCountries = props.myCountries.length

    switch(true){
        case numberOfCountries > 10:
            return <div>Too many matches</div>
            break
        case numberOfCountries > 1:
            return <ShowBasicInfo myCountries={props.myCountries} />
            break
        case  numberOfCountries === 1:
            return <ShowDetailedInfo country = {props.myCountries[0]} />
        default:
            return <div>No match</div>
    }
}

const ShowBasicInfo = (props) => {
    const rows = props.myCountries.map(
        item => <li key={item.name}>{item.name}</li>
    )

    return (
        <ul>
        {rows}
        </ul>
    )
}

const ShowDetailedInfo = (props) => {
    return(<div>Exact match</div>)
}

export default App