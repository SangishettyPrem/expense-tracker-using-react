import React from 'react'

const InfoCard = () => {
    let isIncome = Math.round(Math.random());
    return (
        <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
            Try saying: <br />
            Add {isIncome ? 'Income ' : 'Expense '}
            for {isIncome ? '$100 ' : '$50 '}
            in Category {isIncome ? 'Salary ' : 'Travel '}
            for {isIncome ? 'Monday ' : 'Thursday '}
        </div>
    )
}

export default InfoCard