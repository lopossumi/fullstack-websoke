import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const counter = {
    hyva: 0,
    neutraali : 0,
    huono: 0
}

const Button = (props) => {
    return (
        <button 
            className={"button btn-"+props.color} 
            onClick = {() => increase(props.counterName)}>
            {props.name}
        </button>
    )
}

const increase = (props) => {
    counter[props]++
    renderoi()
}

const Statistics = (props) => {
    const {counter} = props
    const yhteensa = counter.hyva + counter.neutraali + counter.huono
    const keskiarvo = yhteensa === 0 ? 0 : ((counter.hyva - counter.huono)/yhteensa).toFixed(1)
    const positiivisia = yhteensa === 0 ? 0 : ((counter.hyva/yhteensa) * 100).toFixed(0)+" %"

    if (yhteensa >0){
    return(
        <div id="statistiikka">
        <h2>Statistiikka</h2>
        
        <Statistic name = "Hyvä" value = {counter.hyva} />
        <Statistic name = "Neutraali" value = {counter.neutraali} />
        <Statistic name = "Huono" value = {counter.huono} />
        <Statistic name = "Keskiarvo" value = {keskiarvo} />
        <Statistic name = "Positiivisia" value = {positiivisia} />
        </div>
    )
    } else return(<div><h2>Statistiikka</h2>Ei yhtään palautetta annettu.</div>)
}

const Statistic = (props) => {
    return(
        <div>{props.name}: {props.value}</div>
    )
}


const App = (props) => {
    const {counter} = props

    return (
        <div>
          <h1>Anna palautetta</h1>
          <Button name="Hyvä" counterName="hyva" color="green" />
          <Button name="Neutraali" counterName="neutraali" color="yellow"/>
          <Button name="Huono" counterName="huono" color="red"/>
          
          <Statistics counter = {counter}/>

        </div>
  )
}

const renderoi = () => {
ReactDOM.render(
  <App counter = {counter}/>,
  document.getElementById('root')
)
}

renderoi()