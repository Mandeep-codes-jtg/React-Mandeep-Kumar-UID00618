import { render, screen } from "@testing-library/react";
import UserDetailsComponent from "./UserDetailsComponent";
import type { GitHubUser } from "../types/github";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import followersReducer from "../reducers/followersReducer";
import authReducer from "../reducers/authReducer";

describe('UserDetails component', () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            followers: followersReducer
        }
    })
    test('component renders data', ()=>{
        const user: GitHubUser = {
            avatar_url: '',
            bio: 'bio',
            blog: '',
            email: 'memail.com',
            followers: 245,
            following: 19,
            html_url: 'abc.com',
            id: 80,
            location: 'usa',
            login: 'hello'
        }
        render(
            <Provider store={store}>
                <UserDetailsComponent user={user}/>
            </Provider>
        )
        expect(screen.getByText('bio')).toBeDefined()
        expect(screen.getByText('245')).toBeDefined()
        expect(screen.getByText('19')).toBeDefined()
        expect(screen.getByText('usa')).toBeDefined()
        expect(screen.getByText('hello')).toBeDefined()
    })
})
