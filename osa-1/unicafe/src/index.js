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


const App = (props) => {
    const {counter} = props
    return (
        <div>
          <h1>Anna palautetta</h1>
          <Button name="Hyvä" counterName="hyva" color="green" />
          <Button name="Neutraali" counterName="neutraali" color="yellow"/>
          <Button name="Huono" counterName="huono" color="red"/>
          
          <h2>Statistiikka</h2>
          <p>
          Hyvä: {counter.hyva}<br />
          Neutraali: {counter.neutraali}<br />
          Huono: {counter.huono} 
          </p>

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