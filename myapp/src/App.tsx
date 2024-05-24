import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import "./css/General.css"

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

export default App