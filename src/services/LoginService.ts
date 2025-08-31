import axios from 'axios';
import type { GitHubUser } from '../types/github';

export const loginUsingPAT = async (token: string): Promise<GitHubUser> => {
    const response = await axios.get(
        'https://api.github.com/user',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
};
