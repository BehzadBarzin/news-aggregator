import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider
      authType='cookie'
      authName='_auth'
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
        <div className='bg-primary w-full overflow-hidden'>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/my-feed' element={<RequireAuth loginPath='/login'><MyFeed /></RequireAuth>} /> */}
            </Routes>
          </BrowserRouter>
        </div>
    </AuthProvider>
  )
}

export default App