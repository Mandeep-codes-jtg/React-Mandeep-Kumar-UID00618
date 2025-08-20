import axios from 'axios';

export const isFollowing = async (username: string, token: string) => {
    const response = await axios.get(
        `https://api.github.com/user/following/${username}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.status
};
