import selectExpensesTotal from './../../selectors/expenses-total';
import expenses from './../fixtures/expenses';

test("expenses total should be 0 if no expenses", () => {
    const result = selectExpensesTotal([]);
    expect(result).toEqual(0);
});

test("expenses total should return the sum of all expenses amount", () => {
    const result = selectExpensesTotal(expenses);
    expect(result).toEqual(89.5);
});

test("expenses total should return the sum of one expense amount", () => {
    const result = selectExpensesTotal([expenses[0]]);
    expect(result).toEqual(19.5);
});