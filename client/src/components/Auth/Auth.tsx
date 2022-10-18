import React, { FC, useState } from 'react'
import styles from './auth.module.css'
import { AuthFormData, AuthProps } from './types'

const Auth: FC<AuthProps> = ({ setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = React.useState<boolean>(false)
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    isRegister,
  })

  const switchFormMode = () => setIsRegister(!isRegister)

  const onSubmit = (e: any): void => {
    e.preventDefault()
    console.log(formData)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <div className={styles.container}>
      <h1>Please {isRegister ? 'register' : 'login'}</h1>
      <form action="POST" onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />

        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button type="button" onClick={switchFormMode}>
        Switch to {isRegister ? 'login' : 'register'}
      </button>
    </div>
  )
}

export default Auth
