import axios from 'axios';
import { type GitHubUser } from '../types/github';

export const getRandomSuggestions = async (token?: string): Promise<GitHubUser[]> => {
  const since = Math.floor(Math.random() * 100_000_000);
  const response = await axios.get(
    'https://api.github.com/users',
    {
      params: { per_page: 5, since },
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      validateStatus: () => true,
    }
  );
  return response.data as GitHubUser[];
};
