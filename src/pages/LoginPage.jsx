import React from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import LoginInput from '../components/LoginInput'
import {login} from '../utils/network-data'
import LocaleContext from '../contexts/LocaleContext'

function LoginPage({loginSuccess}) {
    async function onLogin({email, password}) {
        const {error, data} = await login({email, password})

        !error && loginSuccess(data)
    }

    return (
        <LocaleContext.Consumer>
            {({locale}) => (
                <section className="login-page">
                    <h2>
                        {locale === 'id'
                            ? 'Login untuk masuk ke aplikasi..'
                            : 'Please login to enter the application'}
                    </h2>
                    <LoginInput login={onLogin} />
                    <p>
                        {locale === 'id'
                            ? 'Belum punya akun? '
                            : "Don't have an account?"}

                        <Link to="/register" className="button-enter">
                            {locale === 'id' ? 'Daftar' : 'Register'}
                        </Link>
                    </p>
                </section>
            )}
        </LocaleContext.Consumer>
    )
}

LoginPage.propTypes = {
    loginSuccess: propTypes.func.isRequired,
}

export default LoginPage
