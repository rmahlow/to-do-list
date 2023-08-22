import styles from './Header.module.css'
import logo from '../assets/rocket.svg'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={logo} alt="" />
            <strong className={styles.firtNameLogo}>to</strong><strong className={styles.secondNameLogo}>do</strong>

        </header>
    )
}