import SignUpForm from "../components/Authentication/SignUpForm"
import Navbar from '../components/Navbar/Navbar'
import styles from '../components/Navbar/Navbar.module.scss'

export default function SignUp() {
    return (
        <div>
            <Navbar darkText />
            <SignUpForm />
        </div>
    )
}