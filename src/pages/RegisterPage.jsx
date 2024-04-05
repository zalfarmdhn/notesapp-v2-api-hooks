import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import RegisterInput from '../components/RegisterInput'
import {register} from '../utils/network-data'
import LocaleContext from '../contexts/LocaleContext'

function RegisterPage() {
    const navigate = useNavigate()

    async function onRegisterHandler(user) {
        const {error} = await register(user)
        !error && navigate('/')
    }

    return (
        <LocaleContext.Consumer>
            {({locale}) => (
                <section className="register-page">
                    <h2>
                        {locale === 'id'
                            ? 'Isi form untuk mendaftar akun.'
                            : 'Fill the form to register account.'}
                    </h2>
                    <RegisterInput register={onRegisterHandler} />
                    <p>
                        Kembali ke{' '}
                        <Link to="/" className="button-enter">
                            Login
                        </Link>
                    </p>
                </section>
            )}
        </LocaleContext.Consumer>
    )
}

export default RegisterPage
