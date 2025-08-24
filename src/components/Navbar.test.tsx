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
        expect(userSearch).toBeDefined()
        expect(login).toBeDefined()
    })
    test('should have suggestions link when authenticated.',()=>{
        Cookies.set('token','jkjkj')
        render(
            <Provider store={storeUnauthenticated}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </Provider>
        )
        const suggestions = screen.getByText(/Suggestions/i)
        expect(suggestions).toBeDefined()
    })
})
