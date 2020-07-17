import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYKE6TIHNQZQDclQ5il_21mq7Ax81h15w';
		if (!isSignup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYKE6TIHNQZQDclQ5il_21mq7Ax81h15w';
		}
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
