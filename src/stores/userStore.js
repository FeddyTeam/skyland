import { action, observable, computed } from 'mobx'
import agent from '../graphql'

import setupLoading from './mixins/setupLoading'
import setupPagination from './mixins/setupPagination'
import setupModal from './mixins/setupModal'

@setupLoading
@setupPagination
@setupModal
class UserStore {
    userStatus = ['pending', 'active', 'deleted']

    @observable userMap = new Map()
    
    @action async listUser(options) {
        try {
            this.startProgress()
            const { data: { userList } } = await agent.user.list(options)
            const _map = userList.map(one => [one._id, one])
            this.userMap.merge(_map)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async updateUser(userInput) {
        try {
            this.startProgress()
            const { data: { user } } = await agent.user.update(userInput)

            this.setUser(user)

            return user
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound setUser(user) {
        this.userMap.set(user._id, user)
    }

    @computed get userList() {
        // todo: add pagination
        return Array.from(this.userMap.values())
    }
}

export default new UserStore()
