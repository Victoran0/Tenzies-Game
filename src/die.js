import React from 'react';
import './die.css'


export default function Die(props) {
    const Pip = () => <span className="pip styles" />;
    const styles = {
        backgroundColor: props.isHeld ? '#59e391' : 'white'
    }
    const Face = ({ children }) => <div className="face" style={styles} onClick={props.diceHeld}>{children}</div>;
	let pips = Number.isInteger(props.value)
		? Array(props.value)
            .fill(0) 
            .map((_, i) => <Pip key={i} />)
		: null;
	return (
        <Face>{pips}</Face>
    )
};
