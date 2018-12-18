import { gql } from 'apollo-boost'

const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser(
            data: $data
        ){
            token,
            user {
                id
                username
                email
            }
        }
    }
`
const login = gql`
    mutation($data:LoginUserInput!) {
        login (
            data: $data
        ){
            token
        }
    }
`
const getUsers = gql`
    query {
        users {
            id
            username
            email
        }
    }
`
const getProfile = gql`
    query {
        me {
            id
            username
            email
        }
    }
`

export { createUser, login, getUsers, getProfile }