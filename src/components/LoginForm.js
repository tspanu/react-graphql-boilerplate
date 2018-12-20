import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default class LoginForm extends React.Component {
    AuthRender = ({ errors, touched, isSubmitting }) => {
        return (
            <Form className="form">
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className="text-input" type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field className="text-input" type="password" name="password" placeholder="Password" />
                </div>
                <button className="button" disabled={isSubmitting} type="submit">Log in</button>
            </Form>
        )
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
