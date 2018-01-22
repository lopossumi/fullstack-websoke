import React from 'react'

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
            <Yhteensa kurssi={props.kurssi} />
        </div>
    )
}

const Otsikko = (props) => <h2>{props.kurssi.nimi}</h2>

const Sisalto = (props) => {
    const osat = () => props.kurssi.osat.map(
        osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />
    )

    return (
        <div>{osat()}</div>
    )
}

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Yhteensa = (props) => {
    const summa = props.kurssi.osat
        .map(osa => osa.tehtavia)
        .reduce((a, b) => a + b)

    return (
        <p>Yhteensä {summa} tehtävää</p>
    )
}

export default Kurssi