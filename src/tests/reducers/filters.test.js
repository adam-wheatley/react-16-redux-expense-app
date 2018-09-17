import moment from 'moment';
import filtersReducers from './../../reducers/filters';

test("should setup default values", () => {
    const state = filtersReducers(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test("should set sortBy to amount", () => {
    const state = filtersReducers(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toEqual('amount');
});

test("should set sortBy to date", () => {
    const defaultState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const state = filtersReducers(defaultState, {type: 'SORT_BY_DATE'});
    expect(state.sortBy).toEqual('date');
});

test("should set text filter value", () => {
    const state = filtersReducers(undefined, {type: 'SET_TEXT_FILTER', text: 'rent'});
    expect(state.text).toEqual('rent');
});

test("should set start date filter value", () => {
    const state = filtersReducers(undefined, {type: 'SET_START_DATE', date: 0});
    expect(state.startDate).toEqual(0);
});


test("should set end date filter value", () => {
    const state = filtersReducers(undefined, {type: 'SET_END_DATE', date: 0});
    expect(state.endDate).toEqual(0);
});