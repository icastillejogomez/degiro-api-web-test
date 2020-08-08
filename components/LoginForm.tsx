// React imports
import { useState } from 'react'

// Styles imports
import styles from '../styles/LoginForm.module.css'

type LoginFormPropsType = {
  onSubmit: ({ username, password }: { username: string, password: string }) => void,
}

export default function LoginForm (props: LoginFormPropsType) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className={styles.main} >
      <h1>degiro-api web test</h1>
      <hr />
      <div className={styles.form} >
        <label className={styles.label} htmlFor='username' >Usuario:</label>
        <input id='username' type='text' className={styles.input} value={username} onChange={event => setUsername(event.target.value)} />

        <label className={styles.label} htmlFor='pwd' >Contraseña:</label>
        <input id='pwd' type='password' className={styles.input} value={password} onChange={event => setPassword(event.target.value)} />

        <button className={styles.button} onClick={() => props.onSubmit({ username, password })} >Iniciar sesión</button>
      </div>
    </main>
  )
}