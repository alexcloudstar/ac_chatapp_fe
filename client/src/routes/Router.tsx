import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatHeader } from '@/components'
import { HeaderLayout } from '@/Layouts'
import { setIsLoggedIn, setToken } from '@/store/slices/token'

import { routes } from './routes'

const Router = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoggedIn(!!localStorage.getItem('accessToken')))
    dispatch(setToken(localStorage.getItem('accessToken') || ''))
  }, [dispatch])

  return (
    <BrowserRouter>
      <HeaderLayout>
        <ChatHeader />
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </HeaderLayout>
    </BrowserRouter>
  )
}

export default Router
