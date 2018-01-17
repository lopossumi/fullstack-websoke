import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return(
        <div>
        <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    var rows = []
    props.osat.forEach(item => {
        rows.push(<Osa nimi={item.nimi} lkm={item.tehtavia} />)
    });
    return(<div>{rows}</div>)
}

const Yhteensa = (props) => {
    const summa = props.osat
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
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10,
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

  return (
        <div>
          <Otsikko kurssi={kurssi} />
          <Sisalto osat={osat}/>
          <Yhteensa osat={osat}/>
        </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
