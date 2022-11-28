import React, { FC } from 'react'

import { ChatHeader } from 'components'

const Floating: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col w-[90%] lg:w-[70%]  h-[90%]	 pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787]/[70%] rounded-[40px] shadow-floating-container">
    <ChatHeader />
    {children}
  </div>
)

export default Floating
