import React from "react"
import Die from "./die"
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import Timer from "./timer";

export default function App() {
    const winTime = localStorage.getItem('winnerTime')
    const winningTime = JSON.parse(winTime)
    function winnTime() {
        if (winningTime > 0) {
            return winningTime
        } else {
            return 1000000
        }
    }
    let startTime = 0
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [time, setTime] = React.useState(startTime);
    const [maxTime, setMaxTime] = React.useState(winnTime())
    const [yourScore, setYourScore] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        
        return () => clearInterval(interval);
    }, [])
    
    function secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);
        
        const hDisplay = h > 0 ? h + " hours " : " ";
        const mDisplay = m > 0 ? m + " minutes " : " ";
        const sDisplay = s > 0 ? s + " seconds " : " ";
        return hDisplay + mDisplay + sDisplay; 
    }


    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setYourScore(time)
            if (time < maxTime) {
                setMaxTime(time)
                localStorage.setItem('winnerTime', JSON.stringify(time))
            }
        } else {
            
        }
    }, [dice])


    function diceHeld(id) {
        setDice(prevDIce => 
            prevDIce.map(diceMap => {
                return diceMap.id === id ?
                {...diceMap, isHeld: !diceMap.isHeld}: diceMap;
            })
        )
    }
    
    const diceElements = dice.map(num => <Die value={num.value} key={num.id} diceHeld={() => diceHeld(num.id)} isHeld={num.isHeld} />)
    
    function generateNewDice() {
        return {value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function rollDIce() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die =>{
                return die.isHeld ? die : generateNewDice()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTime(0)
        }
    }
    
    
    function allNewDice() {
        const newDice = []
        for (let i=0; i<10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }


    localStorage.setItem('bestWin', JSON.stringify(maxTime))

    return (
        <main className="main">
            { tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same, click each die to freeze it at its current value between rolls.</p>
            {tenzies ? <p>YOU WON!</p> : <Timer time={secondsToHms(time)}/>}
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="rolldice" onClick={rollDIce}>{tenzies ? 'New Game': 'Roll'}</button>
            <p>Fastest Win Time: {secondsToHms(winningTime)}</p>
            {tenzies && <p>Current Win Time: {secondsToHms(yourScore)}</p>}
        </main>
    )
}