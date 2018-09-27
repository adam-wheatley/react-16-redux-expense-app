import moment from 'moment';
import { login, logout } from './../../actions/auth';

test("Should generate login action object", () => {
    const action = login("123");
    expect(action).toEqual({
        type: 'LOGIN',
        uid: '123'
    });
});

test("Should generate logout action object", () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});