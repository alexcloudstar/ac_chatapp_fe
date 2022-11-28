import { API_URL } from 'config/env';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

const App = () => {
  console.log(API_URL);
  console.log(process.env.API_URL);
  return (
    <main className='flex flex-col justify-center items-center w-full h-full bg-[#596787]/[70%]'>
      <BrowserRouter>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
