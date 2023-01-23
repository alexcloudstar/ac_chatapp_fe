import React, { FC, lazy } from 'react'
import { useLocation } from 'react-router-dom'

const ChatHeader = lazy(() => import('components/Header/Header'))

const Floating: FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const includeOverflow = !location.pathname.includes('chat')
    ? 'overflow-y-auto'
    : ''

  return (
    <div
      className={`flex flex-col w-[90%] lg:w-[70%]  h-[90%]	 pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787]/[70%] rounded-[40px] shadow-floating-container relative ${includeOverflow}`}
    >
      <ChatHeader />
      {children}
    </div>
  )
}

export default Floating
