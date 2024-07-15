import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from "./styles.js";
import useTransaction from '../../CustomHooks/useTransactions.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const Details = ({ title }) => {
    const { total, chartData } = useTransaction(title);
    const classes = useStyles();
    return (
        <Card className={title === "Income" ? classes.income : classes.expense} style={{height:'450px',width : "500px", border:"2px solid black",display:"flex",justifyContent:"",alignItems:"center",flexDirection:"column"}}>
            <CardHeader title={title} />
            <CardContent style={{ height: "300px",width:"300px"}} >
                <Typography variant='h5' >{"$" + `${total}`}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    );
};

export default Details;
