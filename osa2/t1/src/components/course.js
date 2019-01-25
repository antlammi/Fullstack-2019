import React from 'react'
const Course = ({course}) => {
    return (
        <div>
            <table>
                <tbody>
                    <Header name={course.name}/>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts}/> 
                </tbody>
            </table>
        </div>
    )
}

const Header = (props) => {
    return (
        <tr>
            <th height="50">{props.name}</th>
        </tr>
    )
}
const Content = ({parts}) => {
    return (
        parts.map(part =>
            <tr key={part.id}>
                <td>{part.name}</td>
                <td>{part.exercises}</td>
            </tr>)
          
       
    )
}
const Total = ({parts}) => {
    const total = parts.reduce((s, p) => {
        if (s.id === 1){
            s= s.exercises+p.exercises
        } else {
            s += p.exercises
        }
        return s
    })
    
    return (
    <tr><td>yhteensä {total} tehtävää</td></tr>
        
    )
}

export default Course