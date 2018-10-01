import gql from 'graphql-tag'

export const LIST_USER = gql`
    query ($options: ListOptions) {
        userList(options: $options) {
            _id
            email
            status
            username
            name
            bio
            avatar
            blog
            roles {
                admin
                editor
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation ($user: UserInput!) {
        user(user: $user) {
            _id
            email
            status
            username
            name
            bio
            avatar
            blog
            roles {
                admin
                editor
            }
        }
    }
`
