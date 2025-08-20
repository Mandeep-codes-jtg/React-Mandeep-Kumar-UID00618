import axios from 'axios';

export const listFollowers = async (token: string) => {
  const response = await axios.get(
    `https://api.github.com/user/followers`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
  );
  return response.data;
};
