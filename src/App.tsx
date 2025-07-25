import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserSearchPage from './pages/UserSearchPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserSearchPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
