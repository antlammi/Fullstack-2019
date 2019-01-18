import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props)
    return (
        <h1>{props.name}</h1>
    )
}
const Content = (props) => {
    console.log(props)
    
    return (
        <div>
            <Part part1 name={props.parts[0].name} exercises={props.parts[0].exercises}/>
            <Part part2 name={props.parts[1].name} exercises={props.parts[1].exercises}/>
            <Part part3 name={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </div>
    )
}
const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p> {props.name} {props.exercises}</p>
        </div>
    )
}
const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p> yhteensä {props.parts[0].exercises 
                + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
        </div>
    )
}
const App = () => {
    const course = {name:'Half Stack -sovelluskehitys',
        parts: [
        {  
            name:'Reactin perusteet',
            exercises:10
        },
        {
            name:'Tiedonvälitys propseilla',
            exercises:7
        },
        {
            name:'Komponenttien tila',
            exercises:14
        }]
    }
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))