export type AuthProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type AuthFormData = {
  email: string
  password: string
  isRegister: boolean
}
