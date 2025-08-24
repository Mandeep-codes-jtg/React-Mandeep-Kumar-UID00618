import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { loginUsingPAT } from '../services/LoginService';
import Cookies from 'js-cookie';
import './LoginComponent.css'

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      Cookies.set('token', tokenInput,{expires: 7})
    } catch (error) {
      console.log(error)
      dispatch({type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.toString() : null})
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
    <div className='container'>
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
