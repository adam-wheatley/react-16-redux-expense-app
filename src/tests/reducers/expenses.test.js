import moment from 'moment';
import expensesReducer from './../../reducers/expenses';
import expenses from './../fixtures/expenses';

test("should setup default values", () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: expenses[1].id});
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense by id if not found", () => {
    const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: null});
    expect(state).toEqual(expenses);
});

test("should add expense", () => {
    const expense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: moment(0)
    };
    const state = expensesReducer(expenses, {type: 'ADD_EXPENSE', expense});
    expect(state).toEqual([...expenses, expense]);
});

test("should edit expense", () => {
    const state = expensesReducer(expenses, {type: 'EDIT_EXPENSE', id: expenses[0].id, updates: { note: 'test'}});
    expect(state[0].note).toEqual("test");
});

test("should not edit expense if expense not found", () => {
    const state = expensesReducer(expenses, {type: 'EDIT_EXPENSE', id: '4', updates: { note: 'test'}});
    expect(state).toEqual(expenses);
});

test("should set expenses", () => {
    const state = expensesReducer(expenses, {type: 'SET_EXPENSES', expenses: [expenses[1]]});
    expect(state).toEqual([expenses[1]]);
});