import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter } from 'react-router-dom'

import stores from './stores'
import { Provider } from 'mobx-react'

import './static/index.css'

ReactDOM.render(
    (<Provider {...stores}>
        <BrowserRouter basename="/skyland">
            <App />
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root'))
registerServiceWorker()
