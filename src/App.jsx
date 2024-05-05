import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import NavBar from "./components/layout/NavBar/NavBar.jsx";
import ItemListContainer from "./components/listComponents/ItemListContainer/ItemListContainer.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import ItemDetailContainer from "./components/detailComponents/ItemDetailContainer/ItemDetailContainer.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import Cart from "./components/CartComponents/Cart/Cart.jsx";
import Checkout from "./components/CartComponents/Checkout/Checkout.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ItemListContainer/>}/>
                    <Route path="beer-type/:categoryName" element={<ItemListContainer/>}/>
                    <Route path="/item/:beerId" element={<ItemDetailContainer/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
                <Footer description={"Trabajo realizado por Martina García"} title={"Brewland Oasis"}/>
            </BrowserRouter>
        </>
    )
}

export default App
