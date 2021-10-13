import Image from 'next/image'
import background from '../../public/background.jpg'
import styles from './Homepage.module.scss'
import Link from 'next/link'

export default function Homepage() {
    return (
        <main>
            <Image src={background} className={styles.backgroundImage} layout="responsive" />
            <div className={styles.homepage}>
                <h1>Hello! Welcome to the Notes App</h1>
                <Link href="notes">
                    <a className={styles.getStartedLink}>Get Started</a>
                </Link>
            </div>
        </main>
    )
}