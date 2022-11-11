import React, { useState } from 'react'

const Auth = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  return (
    <div className="flex flex-col w-[90%] lg:w-[70%] h-[90%] pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white rounded-[40px] shadow-floating-container">
      <h1>Welcome 👋🏻</h1>
      <p className="text-sm">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
      </p>
    </div>
  )
}

export default Auth
