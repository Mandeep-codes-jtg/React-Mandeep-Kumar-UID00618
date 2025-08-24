import axios from 'axios';

export const isFollowing = async (username: string, token: string): Promise<number> => {
    const response = await axios.get(
        `https://api.github.com/user/following/${username}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        }
    )
    return response.status
};
