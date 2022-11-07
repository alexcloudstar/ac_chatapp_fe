import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { Auth } from '@/components'
import { RootState } from '@/store'

const HeaderLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.token)

  return (
    <div className="app-root">
      <div className="app--inner-root">
        {!isLoggedIn ? (
          <Auth />
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
