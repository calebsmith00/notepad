import Navbar from '../Navbar/Navbar'
import styles from './Notes.module.scss'

export default function Notes() {
    return (
        <div className={styles.notesContainer}>
            <Navbar darkText />

            <h2>Note 1</h2>
            <h2>Note 2</h2>
            <h2>Note 3</h2>
            <h2>Note 4</h2>
            <h2>Note 5</h2>
            <h2>Note 6</h2>
        </div>
    )
}