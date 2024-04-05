import React, {useState} from 'react'
import propTypes from 'prop-types'
import useInput from '../hooks/useInput'
import LocaleContext from '../contexts/LocaleContext'

function LoginInput({login}) {
    const [email, onEmailChangeHandler] = useInput('')
    const [password, onPasswordChangeHandler] = useInput('')

    function onSubmitHandler(event) {
        event.preventDefault()

        login({email, password})
    }

    return (
        <form onSubmit={onSubmitHandler} className="login-input">
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={onEmailChangeHandler}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={onPasswordChangeHandler}
            />
            <LocaleContext.Consumer>
                {({locale}) => (
                    <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
                )}
            </LocaleContext.Consumer>
        </form>
    )
}

LoginInput.propTypes = {
    login: propTypes.func.isRequired,
}

export default LoginInput
