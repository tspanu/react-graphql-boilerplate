import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default class AuthForm extends React.Component{
    AuthRender = ({ errors, touched, isSubmitting }) => {
        return (
            <Form className="form">
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className="text-input" type="email" name="email" placeholder="Email" />
                </div>
                {!this.props.isLogin &&
                    <div>
                        {touched.username && errors.username && <p>{errors.username}</p>}
                        <Field className="text-input" type="text" name="username" placeholder="Username" />
                    </div>
                }
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field className="text-input" type="password" name="password" placeholder="Password" />
                </div>
                <button className="button" disabled={isSubmitting} type="submit">
                    {this.props.isLogin ? 'Log in' : 'Sign up'}
                </button>
            </Form>
        )
    }


    onSubmit = (values, { setSubmitting, setErrors }) => {
        this.props.onSubmit({
            email: values.email,
            username: values.username,
            password: values.password
        })
    }

    initialValues = {
        email: '',
        username: '',
        password: '',
    }

    getValidationSchema = () => {
        const loginSchema = Yup.object().shape({
            email: Yup.string().email('Email not valid').required('Email is required'),
            password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required')
        })
        const signupSchema = Yup.object().shape({
            username: Yup.string().min(8, 'Username must be 3 characters or longer').required('Username is required')
        })

        if(!this.props.isLogin){
            console.log('Is this working??')
            loginSchema.concat(signupSchema)
            console.log(loginSchema)
        }
        
        return loginSchema
    }

    render(){
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.getValidationSchema}
                onSubmit={this.onSubmit}
                render={this.AuthRender}
            />
        )
    }
}
