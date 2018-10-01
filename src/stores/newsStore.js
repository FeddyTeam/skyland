import { action, observable, computed } from 'mobx'
import agent from '../graphql'

import setupLoading from './mixins/setupLoading'
import setupPagination from './mixins/setupPagination'

@setupLoading
@setupPagination
class NewsStore {
    statusOptions = ['draft', 'active', 'deleted']
    categoryOptions = ['news', 'project', 'event', 'notice', 'story', 'ad']
    levelOptions = ['hidden', 'normal', 'featured', 'mustread']

    // todo: filter
    // @observable category = null
    // @action.bound setCategory(category) {
    //     this.category = category
    // }

    @observable newsMap = new Map()
    
    @action async listNews(options, filters) {
        try {
            this.startProgress()
            const { data: { newsList } } = await agent.news.list(options, filters)
            const _map = newsList.map(one => [one._id, one])
            this.newsMap.merge(_map)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async updateNews(newsInput) {
        try {
            this.startProgress()
            const { data: { news } } = await agent.news.update(newsInput)

            this.setNews(news)

            return news
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async createNews() {
        try {
            this.startProgress()
            const { data: { newsID } } = await agent.news.create()

            return newsID
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action async getNews(id) {
        try {
            this.startProgress()
            const { data: { news } } = await agent.news.get(id)

            this.setNews(news)

            return news
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound setNews(news) {
        this.newsMap.set(news._id, news)
    }

    @computed get newsList() {
        // todo: add pagination
        return Array.from(this.newsMap.values())
    }
}

export default new NewsStore()