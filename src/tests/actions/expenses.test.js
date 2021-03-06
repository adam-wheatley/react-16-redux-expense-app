import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addExpense, 
        editExpense, 
        removeExpense, 
        startAddExpense, 
        setExpenses, 
        startSetExpenses, 
        startRemoveExpense,
        startEditExpense
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import { database } from './../../firebase/firebase';

const uid = "thisisatestuid123";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt }
    });
    database.ref(`users/${uid}/expenses`).set(expensesData);
});

test("Should setup remove expense action", () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test("Should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[2];
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    })
});

test("Should setup edit expense action", () => {
    const action = editExpense('123abc', {note: 'new note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note value'
        }
    });
});

test("Should edit expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[2];
    const updatedExpense = {
        description: 'car',
        amount: 9900,
        createdAt: 5000,
        note: 'updated'
    }
    store.dispatch(startEditExpense(id, updatedExpense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates: updatedExpense
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(updatedExpense);
        done();
    })
});


test("Should setup add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test("Should add expense to database and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'mouse',
        amount: 2550,
        createdAt: 1000,
        note: ''
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("Should add expense to database and store with default data", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: '',
        amount: 0,
        createdAt: 0,
        note: ''
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test("Should setup set expense action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test("Should fetch expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
});