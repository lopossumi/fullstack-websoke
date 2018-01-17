import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return(
        <div>
        <h1>{props.kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    let rows = []
    props.kurssi.osat.forEach(item => {
        rows.push(<Osa key={item.nimi} nimi={item.nimi} lkm={item.tehtavia} />)
    });
    return(<div>{rows}</div>)
}

const Yhteensa = (props) => {
    const summa = props.kurssi.osat
        .map((x) => x.tehtavia)
        .reduce((a,b)=>(a+b))
    return(
        <div>
        <p>Yhteensä: {summa} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return(
        <div>
        <p>{props.nimi} {props.lkm}</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
        <div>
          <Otsikko kurssi={kurssi} />
          <Sisalto kurssi={kurssi} />
          <Yhteensa kurssi={kurssi} />
        </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
