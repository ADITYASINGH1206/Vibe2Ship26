import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const analyzeTask = async (taskData) => {
    try {
        const response = await api.post('/agent/plan', taskData);
        return response.data;
    } catch (error) {
        console.error("API Error in analyzeTask:", error);
        throw error;
    }
};
