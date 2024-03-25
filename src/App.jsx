import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/NavBarComponent/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainerComponent/ItemListContainer.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <ItemListContainer message={"Hola Mundo!"}/>
        </>
    )
}

export default App
