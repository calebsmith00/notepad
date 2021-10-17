import styles from './SignInForm.module.scss'
import React from 'react'

class SignInForm extends React.Component {
    render() {
        return (
            <div className={styles.signInContainer}>
                <form className={styles.signInForm}>

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className={styles.signInInput} />

                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className={styles.signInInput} />

                    <div className={styles.btnContainer}>
                        <button className={`${styles.btnClear} ${styles.btn}`}>Clear</button>
                        <button className={`${styles.btnLogin} ${styles.btn}`} type="submit">Login</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignInForm