import type { AppDispatch, RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/authActions"
import { Link } from "react-router-dom"

const Navbar = () => {
    const username = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch<AppDispatch>()
    console.log(username)
  return (
    <div style={{height: '100px', backgroundColor: '#3498db', padding: '20px'}}>
        <nav style={{display: "flex", gap: '20px', justifyContent: 'flex-end'}}>
          <Link to='/user-search'>User Search</Link>
          {username && <Link to='/suggestions'>Suggestions</Link>}
          {username && <Link to='/profile'>My Profile</Link>}
          {username ? <Link to='/login' onClick={()=>{dispatch(logout())}}>Logout</Link> : <Link to='/login'>Login</Link>}
        </nav>
    </div>
  )
}

export default Navbar