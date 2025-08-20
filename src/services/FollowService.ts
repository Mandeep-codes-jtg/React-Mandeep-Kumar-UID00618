import axios from 'axios';

export const follow = async (username: string, token: string) => {
    const response = await axios.put(
        `https://api.github.com/user/following/${username}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.status
};
