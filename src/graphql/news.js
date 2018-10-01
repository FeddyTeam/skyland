import gql from 'graphql-tag'

export const GET_NEWS = gql`
    query ($id: ID!) {
        news(id: $id) {
            _id
            title
            author
            content
            color
            link

            status
            category
            level

            thumbnail,
            image,
            screen,
            poster
        }
    }
`

export const LIST_NEWS = gql`
    query ($options: ListOptions, $filtert: NewsListFilters) {
        newsList(options: $options, filters: $filtert) {
            _id
            title
            author
            content
            color
            link

            status
            category
            level

            thumbnail,
            image,
            screen,
            poster
            
            user {
                _id
                name
                username
            }
        }
    }
`

export const UPDATE_NEWS = gql`
    mutation ($news: NewsInput!) {
        news(news: $news) {
            _id
            title
            author
            content
            color
            link

            status
            category
            level

            thumbnail,
            image,
            screen,
            poster
            
            user {
                _id
                name
                username
            }
        }
    }
`

export const CREATE_NEWS = gql`
    mutation {
        newsID
    }
`