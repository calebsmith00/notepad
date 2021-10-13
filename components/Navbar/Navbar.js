import styles from './Navbar.module.scss'
import Link from 'next/link'

export default function Navbar({ darkText }) {
    function getClassNames() {
        // Uses a ternary operator to determine if the navbar needs dark text or white text.
        return (
            darkText 
            ? `${styles.link} ${styles.darkText}`
            : styles.link
        ) 
    }

    return (
        <div className={styles.navbar}>
            <Link href="/">
                <a className={getClassNames()}>Home</a>
            </Link>

            <Link href="/notes">
                <a className={getClassNames()}>Notes</a>
            </Link> 

            <Link href="/signin">
                <a className={getClassNames()}>Sign In</a>
            </Link>

            <Link href="/signup">
                <a className={getClassNames()}>Sign Up</a>
            </Link>
        </div>
    )
}