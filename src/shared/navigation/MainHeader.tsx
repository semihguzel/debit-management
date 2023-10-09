import React, {JSX} from "react";
import {Link} from "react-router-dom";

import {Layout, Menu} from "antd";

const {Header} = Layout;

interface MenuItems {
    key: string;
    label: JSX.Element
}

const menuItems: MenuItems[] = [{
    key: 'login',
    label: <Link to={'/auth'}>Login</Link>
}]

const MainHeader : React.FC = () => {
    return (
        <Header>
            <Menu
                style={{justifyContent: "flex-end"}}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={menuItems.map(x => x.key)}
                items={menuItems}
            />
        </Header>
    )
}

export default MainHeader;