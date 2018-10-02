import axios from 'axios'

import { print } from 'graphql/language/printer'

import { LOGIN, QINIU_TOKEN } from './auth'
import { GET_NEWS, CREATE_NEWS, UPDATE_NEWS, LIST_NEWS } from './news'
import { GET_PROFILE, UPDATE_PROFILE } from './profile'
import { LIST_USER, UPDATE_USER } from './user'

const token = localStorage.getItem('token')
const agent = axios.create({
    url: '/graphql',
    method: 'POST',
    headers: {
        'Authentication': `Bearer ${token}`,
    },
})

const query = async (query, variables) => {
    const response = await agent.request({ data: { query: print(query), variables } })
    const { errors } = response.data     
    if (errors) {
        const messages = errors.map(one => one.message)
        throw new Error(messages.join(', '))
    }

    return response.data
}

export const auth = {
    login: async form => query(LOGIN, { form }),
    qiniuToken: async () => query(QINIU_TOKEN),
}

export const profile = {
    get: () => query(GET_PROFILE),
    update: profile => query(UPDATE_PROFILE, { profile }),
}

export const news = {
    get: id => query(GET_NEWS, { id }),
    create: () => query(CREATE_NEWS),
    update: news => query(UPDATE_NEWS, { news }),
    list: (opts, filters) => query(LIST_NEWS, { opts, filters }),
}

export const user = {
    update: user => query(UPDATE_USER, { user }),
    list: opts => query(LIST_USER, { opts }),
}

export default {
    auth,
    profile,
    news,
    user,

    config: {
        setToken(token) {
            agent.defaults.headers['Authentication'] = `Bearer ${token}`
        }
    }
}
