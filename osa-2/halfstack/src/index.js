import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = (props) => {
    const osat = () => props.kurssi.osat.map(
        osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />
    )

    return (
        <div>{osat()}</div>
    )
}

const Yhteensa = (props) => {
    const summa = props.kurssi.osat
        .map(osa => osa.tehtavia)
        .reduce((a, b) => a + b)

    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
            <Yhteensa kurssi={props.kurssi} />
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)