import React, {useState, useEffect, useMemo} from 'react'
import {Route, Routes} from 'react-router-dom'
import {getUserLogged, putAccessToken} from './utils/network-data'
import LocaleContext from './contexts/LocaleContext'
import ThemeContext from './contexts/ThemeContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ArchivedPage from './pages/ArchivedPage'
import AddPage from './pages/AddPage'
import ViewPage from './pages/ViewPage'
import Navigation from './components/Navigation'
import FailedPage from './pages/FailedPage'

function App() {
    const [authedUser, setAuthedUser] = useState(null)
    const [initializing, setInitializing] = useState(true)
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id')
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const toggleLocale = () => {
        setLocale(prevLocale => {
            const newLocale = prevLocale === 'id' ? 'en' : 'id'
            localStorage.setItem('locale', newLocale)
            return newLocale
        })
    }

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

    const localeContext = useMemo(() => {
        return {
            locale,
            toggleLocale,
        }
    }, [locale])

    const themeContext = useMemo(() => {
        return {
            theme,
            toggleTheme,
        }
    }, [theme])

    async function onLoginSuccess({accessToken}) {
        putAccessToken(accessToken)
        const {data} = await getUserLogged()

        setAuthedUser(data)
    }

    useEffect(() => {
        async function fetchData() {
            const {data} = await getUserLogged()
            setAuthedUser(data)
            setInitializing(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    if (initializing) {
        return <p>Loading...</p>
    }

    const onLogout = () => {
        setAuthedUser(null)
        putAccessToken('')
    }

    if (authedUser === null) {
        return (
            <LocaleContext.Provider value={localeContext}>
                <ThemeContext.Provider value={themeContext}>
                    <header className="note-app__header">
                        <Navigation />
                    </header>
                    <main className="note-app__body">
                        <Routes>
                            <Route
                                path="/*"
                                element={
                                    <LoginPage loginSuccess={onLoginSuccess} />
                                }
                            />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                        </Routes>
                    </main>
                </ThemeContext.Provider>
            </LocaleContext.Provider>
        )
    }

    return (
        <>
            <LocaleContext.Provider value={localeContext}>
                <ThemeContext.Provider value={themeContext}>
                    <header className="note-app__header">
                        <Navigation logout={onLogout} name={authedUser.name} />
                    </header>
                    <main className="note-app__body">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/archived"
                                element={<ArchivedPage />}
                            />
                            <Route path="/add" element={<AddPage />} />
                            <Route path="/note/:id" element={<ViewPage />} />
                            <Route path="/*" element={<FailedPage />} />
                        </Routes>
                    </main>
                </ThemeContext.Provider>
            </LocaleContext.Provider>
        </>
    )
}

export default App
