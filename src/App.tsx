import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserSearchPage from './pages/UserSearchPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/user-search' element={<UserSearchPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
