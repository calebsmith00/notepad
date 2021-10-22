import SignUpForm from "../components/Authentication/SignUpForm"
import Navbar from '../components/Navbar/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../components/Authentication/SignUpForm.module.scss'

export default function SignUp() {
    let [error, setError] = useState({ error: false, errorMsg: ""})
    let router = useRouter()

    const validateInput = async(e) => {
        e.preventDefault()

        let { username, email, password } = e.target.elements;
        username = username.value 
        email = email.value
        password = password.value

        // Is there some sort of input?
        if (username && email && password) {
            if (!email.includes("@") && !email.includes('.')) {
                return setError({ error: true, errorMsg: 'Invalid email address'})
            }

            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await res.json()

            console.log(data)
            
            if (!data.success) {
                setError({ error: true, errorMsg: "Invalid login data" })
            } else {
                router.push('/')
            }
        }
    }

    return (
        <div>
            <Navbar darkText />
            <div className={styles.signUpContainer}>
                <form className={styles.signUpForm} onSubmit={validateInput}>
                    <label htmlFor="username">Username</label>
                    <input className={styles.formInput} type="text" name="username" required />
                    
                    <label htmlFor="email">Email</label>
                    <input className={styles.formInput} type="text" name="email" required />

                    <label htmlFor="password">Password</label>
                    <input className={styles.formInput} type="password" name="password" required />                    

                    <div className={styles.btnContainer}>
                        <button type="submit" className={`${styles.btnSignUp} ${styles.btn}`}>Sign Up</button>
                    </div>

                    <p className={styles.error}>{error.errorMsg}</p>
                </form>
            </div>
        </div>
    )
}