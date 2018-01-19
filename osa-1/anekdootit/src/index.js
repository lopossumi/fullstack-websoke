import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(anecdotes.length).fill(0)
        }
    }

    randomQuote = () => {
        this.setState({
            selected: Math.floor(Math.random() * anecdotes.length)
        })
    }

    vote = () => {
        const newVotes = this.state.votes
        newVotes[this.state.selected]++
        this.setState({
            votes: newVotes
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.randomQuote}>Next anecdote</button>
                <table>
                    <tbody>
                        <tr><td><div className="votes">{this.state.votes[this.state.selected]}<br />
                            <button onClick={this.vote}>Vote</button></div></td>
                            <td>
                                <blockquote>{this.props.anecdotes[this.state.selected]}</blockquote>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)