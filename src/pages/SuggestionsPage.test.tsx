import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../reducers/authReducer'
import { MemoryRouter } from 'react-router-dom'
import SuggestionsPage from './SuggestionsPage'
import { listFollowers } from '../services/ListFollowers'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

jest.mock('../services/ListFollowers')

describe('Suggestions page',()=>{
    test('should have abhijeet as a follower', async()=>{
        const mockedFollowers = [
            { id: 1, login: 'abhijeet' },
            { id: 2, login: 'follower2' },
        ];

        (listFollowers as jest.Mock).mockResolvedValue(mockedFollowers);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SuggestionsPage/>
                </MemoryRouter>
            </Provider>
        )
        const ab = await screen.findByText(/abhijeet/i)
        expect(ab).toBeDefined()
    })
})