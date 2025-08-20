import axios from 'axios';

export const getRandomSuggestions = async () => {
    const num = Math.random() * 100000000
    const response = await axios.get(
        `https://api.github.com/users?per_page=5&since=${num}`
    )
    return response.data
};
