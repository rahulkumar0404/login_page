import React, { useState, useReducer, useEffect, useContext, useRef } from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'
import Input from '../UI/Input/Input'


const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return ({value: action.val, isValid: action.val.includes('@')})
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@')}
    }
    return ({ value : '', isValid:false})
}

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return ({value: action.val, isValid: action.val.trim().length>6})
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length>6}
    }
    return ({ value : '', isValid:false})
}


const Login = (props) => {
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })
    const [formIsvalid, setFormIsValid] = useState(false)


    const { isValid: emailIsValid } = emailState
    const { isValid: passwordIsValid } = passwordState
    useEffect(() => {
        console.log('Using useEffect')
        return (() => {
            console.log('clear useEffect')
        })
    }, [])
    
    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('checking the form validation')
            setFormIsValid(
                emailIsValid && passwordIsValid
            )
        }, 500)
        return (() => {
            clearTimeout(identifier)
        })
    }, [emailIsValid, passwordIsValid])

    const authCtx = useContext(AuthContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    
    const emailchangeHandler = event => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
        // setFormIsValid(
        //     event.target.value.includes('@') && passwordState.isValid
        // );
    }

    
    const passwordChangeHandler = event => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

        // setFormIsValid(
        //     emailState.isValid && event.target.value.trim().length > 6
        // );
    }

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' })
    }

    const validatePasswordHandler = () => {
        dispatchPassword('INPUT_BLUR')
    }

    const submitHandler = event => {
        event.preventDefault();
        if (formIsvalid) {
            authCtx.onLogin(emailState.value, passwordState.value)
        }
        else if (!emailIsValid) {
             emailInputRef.current.focus()   
        }
        else {
            passwordInputRef.current.focus()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailchangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />

                <div className={classes.actions}>
                    <Button type='submit'
                        className={classes.button}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default Login;