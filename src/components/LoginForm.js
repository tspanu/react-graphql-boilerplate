import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import '@babel/polyfill'
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'

const USER_EXISTS = gql`
    query UserExists($query:String!) {
        userExists(query: $query) 
    }
`

export default class LoginForm extends React.Component {
    AuthRender = ({ errors, touched, isSubmitting }) => {
        return (
            <Form className="form">
                <div>
                    <ApolloConsumer>
                        {client => (
                            <Field className="text-input" type="email" name="email" placeholder="Email" validate={this.getValidateEmail(client)} />
                        )}
                    </ApolloConsumer>
                    <ErrorMessage name="email" />
                </div>
                <div>
                    <Field className="text-input" type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" />
                </div>
                <button className="button" disabled={isSubmitting} type="submit">Log in</button>
            </Form>
        )
    }

    getValidateEmail = (client) => {
        return async (value) => {
            let error

            const response = await client.query({
                query: USER_EXISTS,
                variables: {
                    query: value
                }
            })

            if (!response.data.userExists) {
                error = "Email doesn't exists"
            }

            return error
        }
    }


    onSubmit = (values) => {
        this.props.login({
            variables: {
                data: {
                    email: values.email,
                    password: values.password
                }
            }
        })
    }

    initialValues = {
        email: '',
        password: ''
    }

    validationSchema = Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required')
    })



    render() {
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
                render={this.AuthRender}
            />
        )
    }
}
