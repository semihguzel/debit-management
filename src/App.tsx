import React from 'react';
import './App.css';
import {Layout} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainHeader from "./shared/navigation/MainHeader";
import MainFooter from "./shared/navigation/MainFooter";
import {useAuth} from "./shared/hooks/auth-hook";
import {AuthContext} from "./shared/context/auth-context";
import {Content} from "antd/es/layout/layout";
import Auth from "./user/pages/Auth";

function App() {
    const {login, logout, token, userId} = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token,
                userId,
                login,
                logout
            }}
        >
            <BrowserRouter>
                <Layout>
                    <MainHeader/>
                    <Content
                        style={{
                            padding: 80,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="/auth" element={<Auth/>}/>
                        </Routes>
                    </Content>
                    <MainFooter/>
                </Layout>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
