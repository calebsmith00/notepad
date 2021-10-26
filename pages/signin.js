import styles from '../styles/Authentication/SignInForm.module.scss'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'
import { useState } from 'react'
const cookie = require('cookie-cutter')

async function login(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export default function SignIn() {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState()
    const [formErrors, setFormErrors] = useState({ error: null, errorMsg: "" })

    const verifyInput = async(e) => {
        e.preventDefault()
        const { username, password } = e.target.elements;

        // Submit POST request to authenticate user
        const verifyLogin = await login('http://localhost:3000/api/auth/login', {
            username: username.value,
            password: password.value
        })

        if (!!verifyLogin.token) {
            setLoggedIn(true)
            return router.replace('/')
        } else {
            setLoggedIn(false)
            setFormErrors({ error: 'INVALID_CREDENTIALS', errorMsg: 'You have entered invalid credentials'})
        }
    }

    return (
        <div>
            <Navbar darkText />
            <div className={styles.signInContainer}>
                <form className={styles.signInForm} onSubmit={verifyInput}>
                    {/* Username */}
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className={styles.signInInput} required />

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className={styles.signInInput} required />

                    {/* Submit buttons */}
                    <button type="submit" className={`${styles.btnLogin} ${styles.btn}`}>Login</button>

                    {/* Check for valid login */}
                    {!!formErrors.error &&
                        <p className={styles.errorMsg}>{formErrors.errorMsg}</p>
                    }
                
                </form>


            </div>
        </div>
    )
}