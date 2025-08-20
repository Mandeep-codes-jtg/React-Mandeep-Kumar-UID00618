import axios from 'axios';

export const getRandomSuggestions = async () => {
    const num = Math.random() * 100000000
    const response = await axios.get(
        `https://api.github.com/users?per_page=5&since=${num}`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
        }
    )
    return response.data
};
