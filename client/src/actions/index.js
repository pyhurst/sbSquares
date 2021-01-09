import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    return function () {
        axios.get('/api/current_user');
    }
};