import React from 'react'
import { inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import { AppHeader, AppContent, AppFooter } from '..'

@inject('authStore')
class App extends React.Component {
    componentWillMount() {
        this.props.authStore.loadToken()
    }

    render() {
        return (
            <div className="app">
                <Layout>
                    <AppHeader/>
                    <Route component={AppContent}/>
                    <AppFooter/>
                </Layout>
            </div>
        )
    }
}

export default App
