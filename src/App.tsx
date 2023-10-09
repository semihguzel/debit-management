import React from 'react';
import './App.css';
import {Layout} from "antd";
import {BrowserRouter} from "react-router-dom";
import MainHeader from "./shared/navigation/MainHeader";
import MainFooter from "./shared/navigation/MainFooter";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <MainHeader/>
                <MainFooter/>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
