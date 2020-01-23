import axios from 'axios';
import urlApiFeed from '../config/global';

const api = axios.create({
    baseURL: urlApiFeed
});

export default api