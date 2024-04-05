import React from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {FiPlusCircle, FiLogOut} from 'react-icons/fi'
import {BsTranslate} from 'react-icons/bs'
import {MdDarkMode, MdLightMode} from 'react-icons/md'
import LocaleContext from '../contexts/LocaleContext'
import ThemeContext from '../contexts/ThemeContext'

function Navigation({logout, name}) {
    return (
        <LocaleContext.Consumer>
            {({locale, toggleLocale}) => {
                return (
                    <>
                        <div className="note-app-header__title">
                            <h1>
                                <Link to="/">
                                    {locale === 'id'
                                        ? 'Aplikasi Catatan'
                                        : 'Notes App'}
                                </Link>
                            </h1>
                        </div>
                        <div className="note-app-header__navigation">
                            <nav className="note-app-header__navigation">
                                <ul>
                                    <li>
                                        <button onClick={toggleLocale}>
                                            {locale === 'id' ? 'id' : 'en'}
                                            <BsTranslate />
                                        </button>
                                    </li>
                                    <li>
                                        <ThemeContext.Consumer>
                                            {({theme, toggleTheme}) => (
                                                <button onClick={toggleTheme}>
                                                    {theme === 'light' ? (
                                                        <MdDarkMode />
                                                    ) : (
                                                        <MdLightMode />
                                                    )}
                                                </button>
                                            )}
                                        </ThemeContext.Consumer>
                                    </li>
                                    {name && (
                                        <>
                                            <li>
                                                <Link to="/">
                                                    {locale === 'id'
                                                        ? 'Aktif'
                                                        : 'Active'}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/archived">
                                                    {locale === 'id'
                                                        ? 'Arsip'
                                                        : 'Archive'}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/add"
                                                    className="note-app__add-button">
                                                    <FiPlusCircle />
                                                    {locale === 'id'
                                                        ? 'Tambah Note'
                                                        : 'Add Note'}
                                                </Link>
                                            </li>
                                            <li>
                                                <button onClick={logout}>
                                                    <FiLogOut />
                                                    {name}
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </>
                )
            }}
        </LocaleContext.Consumer>
    )
}

Navigation.propTypes = {
    logout: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
}

export default Navigation
