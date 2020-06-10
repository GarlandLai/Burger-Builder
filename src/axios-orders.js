import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-a16da.firebaseio.com/',
});

export default instance;
