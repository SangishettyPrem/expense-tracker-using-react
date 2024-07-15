import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Menu } from '@material-ui/core'
import useStyles from "./styles"
import { v4 as uuidv4 } from 'uuid'
import { ExpensesContextProvider } from '../../../context/context'
import { incomeCategories, expenseCategories } from "../../../constants/Categories"
import formatedDate from '../../../utils/formatDate'
import CustomizedSnackbar from '../../Snackbar/CustomizedSnackbar'
const Form = () => {
    const { addTransaction } = useContext(ExpensesContextProvider);
    const classes = useStyles();
    const initialState = {
        type: 'Income',
        amount: '',
        category: '',
        date: formatedDate(new Date())
    }
    const [FormData, setFormData] = useState(initialState);
    const [open, setOpen] = React.useState(false);
    const createTransaction = () => {
        if ((FormData.amount === null || FormData.amount === "") || !FormData.date.includes("-")) {
            return;
        }
        const transaction = { ...FormData, amount: Number(FormData.amount), id: uuidv4() }
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState)
    }
    const selectedCategory = FormData.type === "Income" ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    ....
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={FormData.type} onChange={(e) => setFormData({ ...FormData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={FormData.category} onChange={(e) => setFormData({ ...FormData, category: e.target.value })}>
                        {
                            selectedCategory.map((category, index) => (
                                <MenuItem key={index} value={category.type}>{category.type}</MenuItem>
                            ))
                        }
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="salary">Salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label="Amount" fullWidth value={FormData.amount} onChange={(e) => setFormData({ ...FormData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label="Date" fullWidth value={FormData.date} onChange={(e) => setFormData({ ...FormData, date: formatedDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form