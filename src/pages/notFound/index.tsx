import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

export function NotFound(){
    return(
        <div className={styles.container}>
            <h1>Erro 404!</h1>
            <h2>Página não existe</h2>
            <Link to='/'>
                Voltar para Home
            </Link>

        </div>
    )
}