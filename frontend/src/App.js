
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AddForm from "./components/AddForm";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import AxiosFetch from "./components/AxiosFetch";
import EditForm from "./components/EditForm";
function App() {
    const API_URL = 'http://localhost:3000/api';
    const [products, setProducts] = useState([]);

    const {data, error, isLoading} = AxiosFetch(API_URL);

    useEffect(() => {
        setProducts(data);
    }, [data])

    return (
        <div className="App">
            <Header
                title={"Product List"}
            />

            <Routes>
                <Route exact path="/"  element={
                    <Home
                        data={products}
                        error = {error}
                        isLoading = {isLoading}
                    />
                }/>
                <Route path="/create" element={
                    <AddForm
                        data={data}
                    />
                }/>
                <Route path="/edit" element={
                    <EditForm />
                }/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
