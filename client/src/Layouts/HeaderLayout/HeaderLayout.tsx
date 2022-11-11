import React, { FC } from 'react'

const HeaderLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-root">
      <div className="app--inner-root">
        <main className="flex flex-col w-[90%] lg:w-[70%]  h-[90%]	 pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787]/[70%] rounded-[40px] shadow-floating-container">
          {children}
        </main>
      </div>
    </div>
  )
}

export default HeaderLayout
