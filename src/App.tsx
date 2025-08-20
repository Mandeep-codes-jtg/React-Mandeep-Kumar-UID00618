import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserSearchPage from './pages/UserSearchPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'
import SuggestionsPage from './pages/SuggestionsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginPage />}/>
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
