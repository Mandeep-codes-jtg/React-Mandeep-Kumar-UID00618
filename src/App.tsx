import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserSearchPage from './pages/UserSearchPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'
import SuggestionsPage from './pages/SuggestionsPage'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { loginUsingPAT } from './services/LoginService'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from './store'

function App() {
    const dispatch = useDispatch<AppDispatch>()
    const token = Cookies.get('token'); 
    
    useEffect(() => {
      if (!token) return

      const handleLogin = async () => {
        dispatch({type: 'LOGIN_REQUEST'})
        try {
          const data = await loginUsingPAT(token)
          dispatch({type: 'LOGIN_SUCCESS', payload: data })
        } catch (error) {
          console.log(error)
          dispatch({type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.toString() : null})
        }
      }
      handleLogin()
    }, [token]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/profile' : '/login'} replace />} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/user-search' element={<UserSearchPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/profile' element={<UserProfile />}/>
          <Route path='/suggestions' element={<SuggestionsPage />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
