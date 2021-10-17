import styles from './SignInForm.module.scss'
import React from 'react'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }
    
    onChange = e => {
        let property = e.target.name;
        let value = e.target.value;

        this.setState({
            [property]: value
        })
    }

    authenticate = async(e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3000/api/auth/login', 
            { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }
        )

        const data = await res.json()

        console.log(data)
    }

    render() {
        return (
            <div className={styles.signInContainer}>
                <form className={styles.signInForm}>

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className={styles.signInInput} onChange={this.onChange} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className={styles.signInInput} onChange={this.onChange} />

                    <div className={styles.btnContainer}>
                        <button className={`${styles.btnClear} ${styles.btn}`}>Clear</button>
                        <button className={`${styles.btnLogin} ${styles.btn}`} onClick={this.authenticate} type="submit">Login</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignInForm