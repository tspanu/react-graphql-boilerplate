import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '@babel/polyfill'
import client from '../index'
import gql from 'graphql-tag'


export default class SignupForm extends React.Component {
    signupRender = ({ errors, touched, isSubmitting }) => {
        return (
            <Form className="form">
                <div>
                    <Field className="text-input" type="email" name="email" placeholder="Email" validate={this.validateEmail} />
                    <ErrorMessage name="email" />
                </div>
                <div>
                    <Field className="text-input" type="text" name="username" placeholder="Username" validate={this.validateUsername} />
                    <ErrorMessage name="username" />
                </div>
                <div>
                    <Field className="text-input" type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" />
                </div>
                <button className="button" disabled={isSubmitting} type="submit">Sign up</button>
            </Form>
        )
    }

    onSubmit = (values) => {
        this.props.signup({
            variables: {
                data: {
                    email: values.email,
                    username: values.username,
                    password: values.password
                }
            }
        })
    }


    validateEmail = async (value) => {
        let error

        const USER_EXISTS = gql`
            query UserExists($query:String!) {
                userExists(query: $query) 
            }
        `

        const response = await client.query({
            query: USER_EXISTS,
            variables: {
                query: value
            }
        })

        if (response.data.userExists) {
            error = 'Email taken'
        }

        return error
    }

    validateUsername = async (value) => {
        let error

        const USER_EXISTS = gql`
            query UserExists($query:String!) {
                userExists(query: $query) 
            }
        `

        const response = await client.query({
            query: USER_EXISTS,
            variables: {
                query: value
            }
        })

        if (response.data.userExists) {
            error = 'Username taken'
        }

        return error
    }

    initialValues = {
        email: '',
        username: '',
        password: '',
    }

    validationSchema = Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        username: Yup.string().min(3, 'Username must be 3 characters or longer').required('Username is required'),
        password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required')
    })

    render() {
        return (
            <Formik
                validateOnBlur
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
                render={this.signupRender}
            />
        )
    }
}
