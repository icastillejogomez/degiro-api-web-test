// React imports
import { useState } from 'react'

// Next imports
import Head from 'next/head'

// Style imports
import styles from '../styles/Home.module.css'

// Component imports
import LoginForm from '../components/LoginForm'

// degiro-api
import DeGiro from 'degiro-api'

// Types
type handleSubmitType = ({ username, password } : { username: string, password: string }) => void

export default function Home() {
  const [status, setStatus] = useState([])

  const addLine = (line: string) => setStatus(status => [...status, line])

  const handleSubmit: handleSubmitType = async ({ username, password: pwd }) => {

    // Reset the status
    setStatus([])

    // Check username and password
    if (!username || !pwd) return addLine('Introduce tu usuario y contraseña')

    // Init login
    try {
      addLine('Instanciando objeto DeGiro...')
      const degiro = new DeGiro({ username, pwd })
      
      addLine('Iniciando sesión...')
      await degiro.login()
      addLine('Sessión iniciada correctamente')

      addLine('Obteniendo id de usuario de la cuenta...')
      const accountData = await degiro.getAccountData()
      addLine(`El identificador de la cuenta es: ${accountData.data.id}`)
    } catch (error) {
      console.error(error)
      addLine(error && error.toString())
    }
  }

  

  return (
    <div>
      <Head>
        <title>degiro-api web test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginForm onSubmit={handleSubmit} />
      
      { status.map((line, index) => <p style={styles} key={index} className={styles.status} >{line}</p> ) }
      

    </div>
  )
}
