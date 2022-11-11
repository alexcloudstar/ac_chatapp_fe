import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatHeader } from '@/components'
import { Auth } from '@/components/Auth'
import { HeaderLayout } from '@/Layouts'

import { routes } from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderLayout>
        <Routes>
          <Route key="auth" path="/auth" element={<Auth />} />
          {routes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <ChatHeader />
                  {component}
                </>
              }
            />
          ))}
        </Routes>
      </HeaderLayout>
    </BrowserRouter>
  )
}

export default Router
