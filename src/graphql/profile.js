import gql from 'graphql-tag'

export const GET_PROFILE = gql`
    query {
        profile {
            username
            name
            avatar
            blog
            bio
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation ($profile: ProfileInput!) {
        profile (profile: $profile) {
            username
            name
            avatar
            blog
            bio
        }
    }
`