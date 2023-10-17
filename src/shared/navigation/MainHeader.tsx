import React, {JSX, useContext} from "react";
import {Link} from "react-router-dom";

import {Button, Layout, Menu} from "antd";
import {AuthContext, IAuthContext} from "../context/auth-context";

const {Header} = Layout;

interface IMenuItems {
    key: string;
    label: JSX.Element
}

let menuItems: IMenuItems[] = [{
    key: 'login',
    label: <Link to={'/auth'}>Login</Link>
}]

const handleUserAuth = (auth: IAuthContext) => {
    let items = [...menuItems];
    if (auth.isLoggedIn) {
        let logMenuItem = items.find(x => x.key === 'login')!;
        if (logMenuItem) {
            logMenuItem.key = 'logout';
            logMenuItem.label = (
                <Button danger type='text' onClick={auth.logout}>Logout</Button>
            )
        }
    } else {
        let logMenuItem = items.find(x => x.key === 'logout')!;
        if (logMenuItem) {
            logMenuItem.key = 'login';
            logMenuItem.label = (
                <Link to={'/auth'}>Login</Link>
            )
        }
    }
    
    menuItems = items;
}

const MainHeader: React.FC = () => {
    const auth = useContext(AuthContext);
    handleUserAuth(auth);

    return (
        <Header>
            <Menu
                style={{justifyContent: "flex-end"}}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['login']}
                items={menuItems}
            />
        </Header>
    )
}

export default MainHeader;