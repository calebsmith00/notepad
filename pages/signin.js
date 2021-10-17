import SignInForm from '../components/Authentication/SignInForm'
import styles from '../components/Authentication/SignInForm.module.scss'
import Navbar from '../components/Navbar/Navbar'


export default function SignIn() {
    return (
        <div>
            <Navbar darkText />
            <SignInForm />
        </div>
    )
}