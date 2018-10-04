import React from 'react'
import { inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import { AppHeader, AppContent, AppFooter } from '..'

@inject('authStore')
class App extends React.Component {
    componentDidMount() {
        this.props.authStore.loadToken()
        this.props.authStore.renew()
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
