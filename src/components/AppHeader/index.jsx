import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Layout, Menu, Icon } from 'antd'

const { Header } = Layout

@inject('authStore')
@inject('profileStore')
@observer
class AppHeader extends React.Component {
    render() {
        const { isAuthed, isEditor, isAdmin } = this.props.authStore
        const { profile, loading } = this.props.profileStore

        return (
            <Header>
                <Menu
                    style={{ lineHeight: '64px' }}
                    theme="dark"
                    mode="horizontal">
                    <Menu.Item key="/">
                        <Link to="/">INDEX</Link>
                    </Menu.Item>
                    {isEditor && <Menu.Item key="/news">
                        <Link to="/news">CONTENT / HOME PAGE</Link>
                    </Menu.Item>}
                    {isAdmin && <Menu.Item key="/user">
                        <Link to="/user">USER</Link>
                    </Menu.Item>}
                    {isAuthed && <Menu.Item key="/profile">
                        <Link to="/profile">
                            {loading && <Icon type='loading'/>}
                            {profile.name || 'PROFILE'}
                        </Link>
                    </Menu.Item>}
                </Menu>
            </Header>
        )
    }
}

export default AppHeader
