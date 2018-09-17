import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from './../../components/ExpenseListFilters';
import { filters, altFilters } from './../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
    />);
});

test("should render expense list filters correctly", () => {
    expect(wrapper).toMatchSnapshot();
})

test("should render expense list filters correctly with alt data", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text filter change", () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', { target: { value }});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should handle sort by date filter change", () => {
    const value = 'date';
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByDate).toHaveBeenCalled();
});

test("should handle sort by amount filter change", () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date filter change", () => {
    const startDate = moment().add(1, 'years');
    const endDate = moment().add(3, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenCalled();
    expect(setEndDate).toHaveBeenCalled();
});

test("should handle date on focus change", () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});