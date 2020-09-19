import React from "react";
import {Layout, Menu} from 'antd';

import {UserOutlined,} from '@ant-design/icons';

import './style.css';
import Title from "antd/es/typography/Title";

const {Sider, Content, Header, Footer} = Layout;

function Home({children}) {

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['users']}>
                    <Menu.Item key="users" icon={<UserOutlined/>}>
                        Users
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background site-layout-header-center" style={{padding: 0}}>
                    <Title className={'header-title'}>Web Admin</Title>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <div style={{padding: 24, minHeight: '90vh'}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Web Admin ©2020 Created Pedro Ivo</Footer>
            </Layout>
        </Layout>
    );
}

export default Home;