import React from 'react'
import propTypes from 'prop-types'
import useInput from '../hooks/useInput'
import LocaleContext from '../contexts/LocaleContext'

function RegisterInput({register}) {
    const [name, onNameChangeHandler] = useInput('')
    const [email, onEmailChangeHandler] = useInput('')
    const [password, onPasswordChangeHandler] = useInput('')
    const [checkPassword, onCheckPasswordChangeHandler] = useInput('')

    function onSubmitHandler(event) {
        event.preventDefault()

        if (password !== checkPassword) return alert('Password tidak sama')
        register({name, email, password})
    }

    return (
        <form onSubmit={onSubmitHandler} className="register-input">
            <LocaleContext.Consumer>
                {({locale}) => (
                    <>
                        <input
                            type="text"
                            placeholder={locale === 'id' ? 'nama' : 'name'}
                            value={name}
                            onChange={onNameChangeHandler}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={onEmailChangeHandler}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onPasswordChangeHandler}
                        />
                        <input
                            type="password"
                            placeholder={
                                locale === 'id'
                                    ? 'konfirmasi password'
                                    : 'confirm password'
                            }
                            autoComplete="current-password"
                            value={checkPassword}
                            onChange={onCheckPasswordChangeHandler}
                        />
                    </>
                )}
            </LocaleContext.Consumer>
            <button>Register</button>
        </form>
    )
}

RegisterInput.propTypes = {
    register: propTypes.func.isRequired,
}

export default RegisterInput
