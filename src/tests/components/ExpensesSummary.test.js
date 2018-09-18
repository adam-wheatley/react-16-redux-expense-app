import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from './../../components/ExpensesSummary';

test("should correctly render expenses summary with 1 expense", () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={20.50} />);
    expect(wrapper).toMatchSnapshot();
});

test("should correctly render expenses summary with multiple expenses", () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={23} expensesTotal={22342340.50} />);
    expect(wrapper).toMatchSnapshot();
});