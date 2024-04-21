import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import NavBar from "./components/layout/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ItemListContainer message={"Home"}/>}/>
                    <Route path="/beers" element={<ItemListContainer message={"Hola Cervezas2!"}/>}/>
                    <Route path="/drinks" element={<ItemListContainer message={"Hola Tragos!"}/>}/>
                    <Route path="/cocktails" element={<ItemListContainer message={"Hola Cocteles!"}/>}/>
                    <Route path="/item" element={<ItemDetailContainer beer={{title: "Golden", price: "2000"}}/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
                <Footer description={"Trabajo realizado por Martina García"} title={"Brewland Oasis"}/>
            </BrowserRouter>
        </>
    )
}

export default App
