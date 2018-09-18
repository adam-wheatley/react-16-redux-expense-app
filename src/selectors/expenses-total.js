export default (expenses) => {
    return expenses.map(expense => expense.amount)
        .reduce((prev, next) => prev + next, 0);
}