import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => {
    return (
        <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>Amount: {numeral(amount).format("$0,00.0")}</p>
        <p>createdAt: {moment(createdAt).format('MMMM Do, YYYY')}</p>
        </div>
    );
}

export default ExpenseListItem;