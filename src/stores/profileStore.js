import { observable, action } from 'mobx'
import agent from '../graphql'

import setupLoading from './mixins/setupLoading'

@setupLoading
class ProfileStore {
    @observable profile = {}

    @action.bound setProfile(profile) {
        this.profile = profile
    }

    @action async getProfile() {
        try {
            this.startProgress()
            const { data: { profile } } = await agent.profile.get()

            this.setProfile(profile)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async updateProfile(values) {
        try {
            this.startProgress()
            const { data: { profile } } = await agent.profile.update(values)

            this.setProfile(profile)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

export default new ProfileStore()