import axios from 'axios';
import type { GitHubUser } from '../types/github';

export const loginUsingPAT = async (username: string, password: string): Promise<GitHubUser> => {
    const response = await axios.get(
        'https://api.github.com/user',
        {
            headers: {
                Authorization: `Bearer ${password}`
            }
        }
    )
    console.log('username is: ', username)
    return response.data
};
