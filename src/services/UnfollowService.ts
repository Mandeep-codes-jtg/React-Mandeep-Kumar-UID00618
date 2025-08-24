import axios from 'axios';

export const unfollow = async (username: string, token: string) => {
    const response = await axios.delete(
        `https://api.github.com/user/following/${username}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.status
};
