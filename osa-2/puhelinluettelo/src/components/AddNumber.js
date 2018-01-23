import React from 'react'

const AddNumber = (props) => {
    return (
        <form onSubmit={props.action}>
            <h2>Lisää uusi</h2>
            <table>
                <tbody>
                    <tr>
                        <td>nimi:</td>
                        <td><input
                            value={props.nameValue}
                            onChange={props.nameHandler} /></td>
                    </tr>
                    <tr>
                        <td>numero:</td>
                        <td><input
                            value={props.numberValue}
                            onChange={props.numberHandler} /></td>
                    </tr>
                    <tr>
                        <td><button type="submit">lisää</button></td>
                    </tr>
                </tbody>
            </table>

        </form>
    )
}

export default AddNumber