import axios from 'axios';
import { type GitHubUser } from '../types/github';

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await axios.get<GitHubUser>(
    `https://api.github.com/users/${encodeURIComponent(username)}`
  );
  return response.data;
};
