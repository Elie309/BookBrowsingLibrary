import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://openlibrary.org',
    timeout: 3000,
});

export default axiosInstance;
