import gql from 'graphql-tag'

export const LOGIN = gql`mutation ($form: LoginForm!) {
    token: login (form: $form)
}`

export const RENEW = gql`mutation {
    token: renew
}`

export const QINIU_TOKEN = gql`mutation {
    qiniuToken
}`
