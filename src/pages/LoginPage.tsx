import LoginComponent from "../components/LoginComponent"
import { useSelector } from "react-redux"
import { type RootState } from "../store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const isAuthenticated = useSelector((state: RootState) => Boolean(state.auth.login))
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuthenticated) {
      navigate('/profile')
    }
  },[isAuthenticated, navigate])
  return (
    <div>
      <LoginComponent />
    </div>
  )
}

export default LoginPage
