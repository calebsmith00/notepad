import styles from './SignUpForm.module.scss'
import React from 'react'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            email: "",
            error: "",
            passwordRequirementMet: "uninitialized"
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
            email: "",
            error: "",
            passwordRequirementMet: "uninitialized"
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
                return this.setState({ error: 'Invalid email address! '})
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

        } else {
            this.setState({ error: 'Invalid input' })
        }
    }

    onChangePassword = e => {
        let password = e.target.value

        this.setState({password})

        if (password.length < 8 && password.length > 1) {
            this.setState({
                passwordRequirementMet: false 
            })
        } else {
            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

            if (!regex.test(password)) {
                this.setState({
                    passwordRequirementMet: false
                })
            } else {
                this.setState({
                    passwordRequirementMet: true
                })
            }
        }
    }

    render() {
        return (
            <div className={styles.signUpContainer}>
                <form className={styles.signUpForm}>
                    <label htmlFor="username">Username</label>
                    <input className={styles.formInput} type="text" name="username" onChange={this.onChange} value={this.state.username} />
                    
                    <label htmlFor="email">Email</label>
                    <input className={styles.formInput} type="text" name="email" onChange={this.onChange} value={this.state.email} />

                    <label htmlFor="password">Password</label>
                    {this.state.passwordRequirementMet === "uninitialized"
                        ? <input className={styles.formInput} type="password" name="password" onChange={this.onChangePassword} value={this.state.password} />
                        : this.state.passwordRequirementMet ?
                            <input className={`${styles.goodPassword} ${styles.formInput}`} type="password" name="password" onChange={this.onChangePassword} value={this.state.password} />
                            : <input className={`${styles.badPassword} ${styles.formInput}`} type="password" name="password" onChange={this.onChangePassword} value={this.state.password} />
                    }
                    

                    <div className={styles.btnContainer}>
                        <button className={`${styles.btnClear} ${styles.btn}`} onClick={this.clearInput}>Clear</button>
                        <button className={`${styles.btnSignUp} ${styles.btn}`} onClick={this.validateInput}>Sign Up</button>
                    </div>

                    <p className={styles.error}>{this.state.error}</p>
                </form>


            </div>
        )
    }
}

export default SignUpForm;