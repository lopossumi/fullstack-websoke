import React from 'react';
import axios from 'axios'
import './App.css';

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
                this.setState({ myFilteredCountries: response.data})
            })
    }

    handleFilter = (event) => {
        let myFilter = event.target.value
        // If there was no event.target.value, div was clicked and the value is read differently.
        if(typeof myFilter==='undefined') myFilter = event.target.attributes.getNamedItem('data-value').value
        
        this.setState({
            myFilter,
            myFilteredCountries: this.filteredCountries(myFilter)
        })
    }

    render() {
        return (
            <div>
                <h1>Les Countrees</h1>
                Find countries: <input value={this.state.myFilter} onChange={this.handleFilter} />

                <ShowCountries myCountries={this.state.myFilteredCountries} myFilter={this.handleFilter} />

            </div>
        )
    }
}

const ShowCountries = (props) => {
    const numberOfCountries = props.myCountries.length

    switch(true){
        case numberOfCountries > 10:
            return <div>More than 10 matches</div>
        case numberOfCountries > 1:
            return <ShowBasicInfo myCountries={props.myCountries} myFilter={props.myFilter}/>
        case  numberOfCountries === 1:
            return <ShowDetailedInfo country = {props.myCountries[0]} />
        default:
            return <div>No match</div>
    }
}

const ShowBasicInfo = (props) => {
    const rows = props.myCountries.map(
        item => <div key={item.name} onClick={props.myFilter} data-value={item.name}>{item.name}</div>
        // TODO: onclickillä muutetaan filtteri item.nameksi
    )

    return (
        <ul>
        {rows}
        </ul>
    )
}

const ShowDetailedInfo = (props) => {
    return(
        <div>
        <h2>{props.country.name}</h2>
        capital: {props.country.capital}<br/>
        population: {props.country.population}<br/>
        <img src={props.country.flag} style={{width:'300px'}} alt={"Flag of "+props.country.name}/>
        </div>
    )
}

export default App