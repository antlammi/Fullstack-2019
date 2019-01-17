import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div> 
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const nimi = 'Jupu'
    const ika = 12
    return (
    <div>
        <Hello name="threat" age ="26"/>
        <Hello name={nimi} age={ika}/>
       
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
