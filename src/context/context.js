import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];
export const ExpensesContextProvider = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);
    //  Action Creators 
    const deleteTransaciton = (id) => {
        dispatch({ type: "DELETE_TRANSACTION", payload: id })
    }

    const addTransaction = (transaction) => {
        dispatch({ type: "ADD_TRANSACTION", payload: transaction })
    }
    const balance = transactions.reduce((acc, currVal) => {
        return (
            currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount
        )
    }, 0)
    return (
        <ExpensesContextProvider.Provider value={{
            deleteTransaciton,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpensesContextProvider.Provider>
    )
}