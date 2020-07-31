import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});
	it('should store the token on login ', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'testToken',
					userId: 'testId',
				}
			)
		).toEqual({
			token: 'testToken',
			userId: 'testId',
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});
});
