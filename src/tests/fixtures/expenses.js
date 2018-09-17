import moment from 'moment'

const expenses = [{
    id: '1',
    description: 'Gum',
    amount: 19.50,
    note: '',
    createdAt: 0
},{
    id: '2',
    description: 'Bread',
    amount: 25.00,
    note: '',
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: '3',
    description: 'Rice',
    amount: 45.00,
    note: '',
    createdAt: moment(0).add(4, 'days').valueOf()
}];

export default expenses;