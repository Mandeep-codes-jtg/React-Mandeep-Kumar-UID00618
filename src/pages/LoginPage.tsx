import LoginComponent from "../components/LoginComponent"
import { useSelector } from "react-redux"
import { type RootState } from "../store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const username = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(username) {
      navigate('/profile')
    }
  },[username, navigate])
  return (
    <div>
      <LoginComponent />
    </div>
  )
}

export default LoginPage
