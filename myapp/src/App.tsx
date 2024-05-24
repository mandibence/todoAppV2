import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import "./css/General.css"
import "./css/App.css"

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="AppInnerContainer">
                <Header />
                <Main />
            </div>
        </div>
    )
}

export default App