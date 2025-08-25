import axios from 'axios';

export const suggest = async (query: string) => {
    const response = await axios.get(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)} in:login&per_page=4`,
        {
            headers: {
                Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`
            }
        }
    )
    return response.data.items
};
