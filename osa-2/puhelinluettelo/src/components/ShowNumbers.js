import React from 'react'

const ShowNumbers = (props) => {
    const tableRows = props.persons.map(
        item => <Person key={item.name} person={item} removeAction={props.removeHandler} />
    )

    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {tableRows}
            </tbody>
            </table>
        </div>
    )
}

const Person = (props) =>
    <tr>
        <td>{props.person.name}</td>
        <td>{props.person.number}</td>
        <td><button value={props.person.id} onClick={props.removeAction}>poista</button></td>
    </tr>

export default ShowNumbers