export type AuthProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type AuthFormInputs = {
  email: string
  username: string
  password: string
}
