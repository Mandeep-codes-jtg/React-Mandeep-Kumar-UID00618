import type { AppDispatch, RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

const Navbar = () => {
    const cookie = Cookies.get('token')
    const username = useSelector((state: RootState)=> state.auth.login)
    const [token, setToken] = useState(cookie)
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
      dispatch({type: 'LOGOUT'})
      Cookies.remove('token')
      setToken('')
    }
    useEffect(()=>{
      const cook = Cookies.get('token') || ''
      setToken(cook)
    },[username])
  return (
    <div style={{height: '100px', backgroundColor: '#3498db', padding: '20px'}}>
        <nav style={{display: "flex", gap: '20px', justifyContent: 'flex-end'}}>
          <Link to='/user-search'>User Search</Link>
          {token && <Link to='/suggestions'>Suggestions</Link>}
          {token && <Link to='/profile'>My Profile</Link>}
          {token ? <Link to='/login' onClick={handleLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
        </nav>
    </div>
  )
}

export default Navbar