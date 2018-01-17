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
        <p>{props.osat[0]} {props.tehtavat[0]}</p>
        <p>{props.osat[1]} {props.tehtavat[1]}</p>
        <p>{props.osat[2]} {props.tehtavat[2]}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    const summa = props.tehtavat.reduce((a,b)=>(a+b))
    return(
        <div>
        <p>Yhteensä: {summa} tehtävää</p>
        </div>
    )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  const osat = [osa1,osa2,osa3]
  const tehtavat = [tehtavia1,tehtavia2,tehtavia3]
  return (
        <div>
          <Otsikko kurssi={kurssi} />
          <Sisalto osat={osat} tehtavat = {tehtavat}/>
          <Yhteensa tehtavat={tehtavat}/>
        </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
