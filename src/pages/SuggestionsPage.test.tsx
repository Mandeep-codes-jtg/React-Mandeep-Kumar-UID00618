import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../reducers/authReducer'
import { MemoryRouter } from 'react-router-dom'
import SuggestionsPage from './SuggestionsPage'
import { listFollowers } from '../services/ListFollowers'
import { listFollowing } from '../services/ListFollowing'
import { getRandomSuggestions } from '../services/ListUsersService'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

jest.mock('../services/ListFollowers', () => ({
  listFollowers: jest.fn(),
}));

jest.mock('../services/ListFollowing', () => ({
  listFollowing: jest.fn(),
}));

jest.mock('../services/ListUsersService', () => ({
  getRandomSuggestions: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn((key) => {
    if (key === 'token') {
      return 'abcd';
    }
    return 'default_value';
  }),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe('Suggestions page',()=>{
    test('should have abhijeet as a follower', async()=>{
        const mockedFollowers = [
            { id: 1, login: 'abhijeet' },
            { id: 2, login: 'follower2' },
        ];

        (listFollowers as jest.Mock).mockResolvedValue(mockedFollowers);
        (listFollowing as jest.Mock).mockResolvedValue([]);
        (getRandomSuggestions as jest.Mock).mockResolvedValue([]);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SuggestionsPage/>
                </MemoryRouter>
            </Provider>
        )
        const ab = await screen.findByText(/abhijeet/i)
        expect(ab).toBeInTheDocument()
    })
})