import React from 'react'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Layout } from 'antd'
import { Login, Hello, NewsList, NewsEditor, Profile, ProfileEditor, UserList } from '..'

const { Content } = Layout

@inject('authStore')
@observer
class AppContent extends React.Component {
    render() {
        const { isAuthed, isEditor, isAdmin } = this.props.authStore

        return (
            <Content
                style={{ minHeight: '100vh', padding: '20px' }}>
                {!isAuthed && <Route path="/" component={Login}/>}
                
                {isAuthed && <Route exact path="/" component={Hello}/>}
                {isAuthed && <Route path="/login" component={Login}/>}
                {isAuthed && <Route exact path="/profile" component={Profile}/>}
                {isAuthed && <Route exact path="/profile/edit" component={ProfileEditor}/>}
                {isEditor && <Route exact path="/news" component={NewsList}/>}
                {isEditor && <Route exact path="/news/edit/:id" component={NewsEditor}/>}
                {isAdmin && <Route exact path="/user" component={UserList}/>}
            </Content>
        )
    }
}

export default AppContent
