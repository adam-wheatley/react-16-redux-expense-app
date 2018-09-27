import moment from 'moment';
import authReducer from './../../reducers/auth';

test("should set uid for login", () => {
    const state = authReducer({}, {type: 'LOGIN', uid: '123'});
    expect(state.uid).toEqual('123');
});

test("should clear uid for logout", () => {
    const state = authReducer({uid: '123'}, {type: 'LOGOUT'});
    expect(state).toEqual({});
});