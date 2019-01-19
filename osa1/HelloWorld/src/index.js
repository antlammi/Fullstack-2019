import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = (props) => { 
    const [clicks, setClicks] = useState({
        left:0, right: 0
    })
    const [allClicks, setAll] = useState([])
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setClicks({
            ...clicks,
            left: clicks.left +1
        })
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setClicks({
            ...clicks,
            right: clicks.right +1
        })
    }
    const History = (props) => {
        if (props.allClicks.length == 0) {
            return(
                <div>
                    sovellusta käytetään nappeja painelemalla
                </div>
            )
        }

        return (
            <div>
                näppäilyhistoria: {props.allClicks.join(' ')}
            </div>
        )
    }

    const Button = ({handleClick, text}) => (
        <button onClick={handleClick}>
            {text}
        </button>
    )
    return (
        <div> 
            <div>
                {clicks.left}
                <Button handleClick={handleLeftClick} text='vasen'/>
                <Button handleClick={handleRightClick} text='oikea'/>
                {clicks.right}
                <History allClicks = {allClicks}/>
            </div>
        </div>
    )
}
/*const App = (props) => {
    const [ counter, setCounter ] = useState(0)
    const setToValue = (value) => setCounter(value)
    

    return(

        <div>
            <Display counter={counter}/>
            <Button handleClick={() => setToValue(counter+1)} text='plus'/>
            <Button handleClick={() =>setToValue(0)} text='zero'/>
           
        </div>
    )
}
*/


/*const App = () => {
    const nimi = 'Jupu'
    const ika = 12
    return (
    <div>
        <Hello name="threat" age ="26"/>
        <Hello name={nimi} age={ika}/>
       
    </div>
    )
}
*/
ReactDOM.render(<App />, document.getElementById('root'));
