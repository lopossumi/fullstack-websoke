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
    return(
        <div>
        <Osa nimi={props.osat[0].nimi} lkm={props.osat[0].tehtavia} />
        <Osa nimi={props.osat[1].nimi} lkm={props.osat[1].tehtavia} />
        <Osa nimi={props.osat[2].nimi} lkm={props.osat[2].tehtavia} />
        </div>
    )
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
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  const osat = [osa1,osa2,osa3]
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
