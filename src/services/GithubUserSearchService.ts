import axios from 'axios';
import { type GitHubUser } from '../types/github';

export const fetchGitHubUser = async (username: string, token?: string): Promise<GitHubUser> => {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
  const headers: Record<string,string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get<GitHubUser>(url, { headers });
  return response.data;
};
