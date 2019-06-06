import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './App.css';

const App = ({
  values,
  errors,
  touched,
  isSubmitting
}) => (
    <div className="Form">
      <Form className="FormGroup">
        <div className="selectPath">
            <span className="joinUs">JOIN US</span>
            <div className="path">
            <Field type="radio" name="student" />
              <span className="student">Student</span>
                  
            <Field type="radio" name="tutor" />
              <span className="tutor">Tutor</span>
            </div>   
        </div>

        <div className="contact"> 
          <div>
            <label>First Name</label>
            <Field type="text" name="firstname" placeholder="John" className="firstname" />
            { touched.firstname && errors.firstname && <p>{ errors.firstname }</p> }
          </div>
          <div>
            <label>Last Name</label>
            <Field type="text" name="lastname" placeholder="Kennedy" />
            { touched.lastname && errors.lastname && <p>{ errors.lastname }</p> }
          </div>
          <div className="full">
            <label>Email</label> 
            <Field type="email" name="email" placeholder="johny@gmail.com" className="email" />
            { touched.email && errors.email && <p>{ errors.email }</p> }
          </div>
          <div className="full">
            <label>Username</label>   
            <Field type="email" name="username" placeholder="e.g. johnkennedy13" className="username" />
            { touched.username && errors.username && <p>{ errors.username }</p> }
          </div>
          <div>
            <label>Password</label>
            <Field type="password" name="password" placeholder="Password" />
            { touched.password && errors.password && <p>{ errors.password }</p> }
          </div>
          <div>
            <label>Confirm Password</label>
            <Field type="password" name="passwordConfirmation" placeholder="Confirm Password"/>
            { touched.passwordConfirmation && errors.passwordConfirmation && <p>{ errors.passwordConfirmation }</p> }
          </div>
        </div>
       
        <div className="passwordHint">
          <p>
            Use 7 or more characters with at least one lowercase character, one uppercase character and a number
          </p>
        </div>
        <div className="terms">        
            <Field type="checkbox" name="terms" checked={values.terms} />
            By signing up, I agree to LOVL's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            { touched.terms && errors.terms && <p>{ errors.terms }</p> }
        </div>
        <button type="submit" disabled={isSubmitting}>SIGN UP</button>
        <div className="loginHint">
          <p>Already a member? <a href="#">Login</a></p>
        </div>
      </Form>
    </div>
  )

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/;

  const FormikApp = withFormik({
    mapPropsToValues({ firstname, lastname, email, username, password, passwordConfirmation, terms }){
      return {
        firstname: firstname || '',
        lastname: lastname || '',
        email: email || '',
        username: username || '',
        password: password || '',
        passwordConfirmation: passwordConfirmation || '',
        terms: terms || false
      }
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
                    .required('First Name is required!'),
      lastname: Yup.string()
                   .required('Last Name is required!'),
      email: Yup.string()
                .email('Email is not valid!')
                .required('Email is required!'),
      username: Yup.string()
                   .required('Username is required!'),
      password: Yup.string()
                   .min(7, 'Password must be at least 7 characters or longer!')
                   .matches(passwordRegExp, 'Use 7 or more characters with at least one lower character, one upper character and a number')
                   .required('Password is required!'),
      passwordConfirmation: Yup.string()
                               .oneOf([Yup.ref('password'), null], 'Passwords must match!')
                               .required('Password confirmation is required!'),
      terms: Yup.bool()
                .test('terms', 'You have to agree with our Terms of Use and Privacy Policy',
                value => value === true)
                .required('You have to agree with our Terms and Privacy Policy!')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }){
      setTimeout(() => {
        if(values.email === 'aydar@test.io'){
          setErrors({ email: 'That email is already taken!' })              
        } else {
            resetForm()
        }
        setSubmitting(false)
      }, 2000)
    }
  })(App)

export default FormikApp;
