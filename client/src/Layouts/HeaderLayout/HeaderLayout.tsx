import React, { FC, useState } from 'react'

import { Auth } from '@/components'

type HeaderLayoutProps = {
  children: React.ReactNode
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderLayout: FC<HeaderLayoutProps> = ({
  children,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  return (
    <div className="app-root">
      <div className="app--inner-root">
        {!isLoggedIn ? (
          <Auth setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <main className="flex flex-col w-[90%] lg:w-[70%]  h-[90%]	 pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787]/[70%] rounded-[40px] shadow-floating-container">
            {children}
          </main>
        )}
      </div>
    </div>
  )
}

export default HeaderLayout
