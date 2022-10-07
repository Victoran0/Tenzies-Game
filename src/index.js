import React from "react";
import ReactDOM from 'react-dom';
import App from "./app";
import './index.css';


function Page() {
    return (
        <div>
            <App />
        </div>
    )
}



ReactDOM.render(<Page />, document.getElementById("root"))