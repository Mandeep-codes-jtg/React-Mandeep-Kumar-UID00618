import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { loginUsingPAT } from '../services/LoginService';
import Cookies from 'js-cookie';
import './LoginComponent.css'
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: { password?: string } = {};
    if (password.trim().length < 6) {
      newErrors.password = 'PAT must be at least 6 characters';
    }
    return newErrors;
  };

  const handleLogin = async () => {
    dispatch({type: 'LOGIN_REQUEST'})
    const tokenInput = password.trim()
    try {
      setLoading(true)
      const data = await loginUsingPAT(tokenInput)
      dispatch({type: 'LOGIN_SUCCESS', payload: data })
      Cookies.set('token', tokenInput, {
        expires: 7,
        sameSite: 'lax',
        secure: window.location.protocol === 'https:'
      })
      navigate('/profile', { replace: true })
    } catch (error) {
      console.log(error)
      const message: string = error instanceof Error ? error.message : 'Login failed'
      dispatch({type: 'LOGIN_FAILURE', payload: message})
      Cookies.remove('token')
      alert('Incorrect token.')
    } finally {
      setLoading(false)
    }
  }

  const formSubmissionHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(loading) return
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handleLogin()
    }
  };

  return (
    <div className='loginContainer'>
      <form onSubmit={formSubmissionHandler}>
        <h1>Login</h1>

        <div>
          <label>Personal Access Token</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your github personal access token"
          />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
