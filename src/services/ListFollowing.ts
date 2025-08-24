import axios from 'axios';

export const listFollowing = async (token: string) => {
  const response = await axios.get(
    `https://api.github.com/user/following`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
  );
  return response.data;
};
