import { render, screen } from '@testing-library/react'
import UserProfile from './UserProfile'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../reducers/authReducer'
import { MemoryRouter } from 'react-router-dom'
import followersReducer from '../reducers/followersReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        followers: followersReducer
    }
})

describe('UserProfile component',()=>{
    test('should have My Profile text',()=>{
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserProfile/>
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByText(/My Profile/i)).toBeInTheDocument()
    })
})