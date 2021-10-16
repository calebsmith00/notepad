import styles from './SignUpForm.module.scss'
import React from 'react'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clearInput = e => {
        e.preventDefault()
        
        this.setState({
            username: "",
            password: "",
            email: ""
        })
    }

    validateInput = async(e) => {
        e.preventDefault()

        let username = this.state.username
        let email = this.state.email
        let password = this.state.password

        // Is there some sort of input?
        if (username && email && password) {
            if (!email.includes("@") && !email.includes('.')) {
                return console.log('Invalid email address')
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

            if (!data) {
                return {
                    notFound: true
                }
            }

            console.log(data)
        } else {
            console.log("Invalid input.")
        }
    }

    render() {
        return (
            <div className={styles.signUpContainer}>
                <form className={styles.signUpForm}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={this.onChange} value={this.state.username} />
                    
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={this.onChange} value={this.state.email} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={this.onChange} value={this.state.password} />

                    <div className={styles.buttonContainer}>
                        <button className={styles.btnClear} onClick={this.clearInput}>Clear</button>
                        <button className={styles.btnSignUp} onClick={this.validateInput}>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpForm;