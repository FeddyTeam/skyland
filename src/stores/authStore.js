import { observable, action, computed, autorun } from 'mobx'
import profileStore from './profileStore'
import agent from '../graphql'

import { get } from 'lodash'

import setupLoading from './mixins/setupLoading'

@setupLoading
class AuthStore {
    @observable token = ''
    @observable info = {}

    @action removeToken() {
        this.token = ''
        localStorage.removeItem('token')
    }

    @action.bound loadToken() {
        const token = localStorage.getItem('token')
        if (/^[\w_-]+\.[\w_-]+\.[\w_-]+$/.test(token)) {
            this.setToken(token)
        }
    }

    @action.bound setToken(token) {
        this.token = token
        localStorage.setItem('token', token)

        try {
            const payload = JSON.parse(atob(token.match(/\.(\w+)\./)[1]))
            if (payload.exp * 1000 > new Date().getTime()) {
                this.info = payload
            } else {
                throw new Error('Token is outdated')
            }
        } catch (err) {
            this.removeToken()
        }
    }

    @action async login (values) {
        this.startProgress()
        try {
            const { data: { token } } = await agent.auth.login(values)

            this.setToken(token)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async renew () {
        if (!this.token) {
            return
        }

        this.startProgress()
        try {
            const { data: { token } } = await agent.auth.renew()

            this.setToken(token)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async mkQiniuToken () {
        try {
            const { data: { qiniuToken } } = await agent.auth.qiniuToken()

            return qiniuToken
        } catch (err) {
            throw err.message
        }
    }

    @action.bound logout() {
        this.info = {}
        this.removeToken()
    }

    @computed get isAuthed() {
        return !!this.token
    }
    @computed get isAdmin() {
        return get(this.info, 'roles.admin', false)
    }
    @computed get isEditor() {
        return get(this.info, 'roles.editor', false)
    }
}

const authStore = new AuthStore()

autorun(() => {
    const { isAuthed, token } = authStore

    agent.config.setToken(token)

    if (isAuthed) {
        profileStore.getProfile()
    }
})

export default authStore
