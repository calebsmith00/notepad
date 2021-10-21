import styles from '../styles/Authentication/SignInForm.module.scss'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'

export default function SignIn() {
    const router = useRouter()

    const verifyInput = async(e) => {
        e.preventDefault()
        const { username, password } = e.target.elements;

        // Submit POST request to authenticate user
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await res.json()

        if (data.hasAccount) {
            router.push('http://localhost:3000')
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
                </form>
            </div>
        </div>
    )
}