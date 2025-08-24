
import { useState, type FormEvent } from 'react';
import { login } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const formSubmissionHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(username,password))
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={formSubmissionHandler}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        <div>
          <label htmlFor='pat'>Personal Access Token (PAT)</label><br />
          <input
            id='pat'
            type="password"
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;

