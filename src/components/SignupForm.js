import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default class SignupForm extends React.Component {
    AuthRender = ({ errors, touched, isSubmitting }) => {
        return (
            <Form className="form">
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className="text-input" type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.username && errors.username && <p>{errors.username}</p>}
                    <Field className="text-input" type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field className="text-input" type="password" name="password" placeholder="Password" />
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
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.onSubmit}
                render={this.AuthRender}
            />
        )
    }
}
