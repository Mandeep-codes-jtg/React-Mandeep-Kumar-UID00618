import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const storeUnauthenticated = configureStore({
  reducer: { auth: authReducer },
});

beforeEach(() => {
  Cookies.remove('token')
})
afterEach(() => {
  Cookies.remove('token')
})

describe('Navbar component',()=>{
    test('should have User-Search and Login when not authenticated',()=>{
        render(
            <Provider store={storeUnauthenticated}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </Provider>
        )
        const userSearch = screen.getByText(/User Search/i)
        const login = screen.getByText(/Login/i)
        expect(userSearch).toBeInTheDocument()
        expect(login).toBeInTheDocument()
    })
    test('should have suggestions link when authenticated and hide login',()=>{
        Cookies.set('token','jkjkj')
        render(
            <Provider store={storeUnauthenticated}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByRole('link', { name: /suggestions/i })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
    })
})
