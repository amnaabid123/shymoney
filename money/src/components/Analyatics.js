import { Progress } from 'antd';
import React from 'react'
import '../resources/analatics.css'
function Analyatics({ transactionData }) {
    console.log(transactionData);
    const totalTransaction = transactionData.length
    const totalIncomeTransaction = transactionData.filter(transactionData => transactionData.type === 'income')
    const totalExpenceTransaction = transactionData.filter(transactionData => transactionData.type === 'expence')
    const totalIncomeTransactionPercentage = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpenceTransactionPercentage = (totalExpenceTransaction.length / totalTransaction) * 100


    const totalTurnover = transactionData.reduce(
        (acc, transactionData) => acc + transactionData.amount, 0);

    const totalIncomeTurnover = transactionData.filter(transactionData => transactionData.type === 'income').reduce(
        (acc, transactionData) => acc + transactionData.amount, 0);
    const totalExpenceTurnover = transactionData.filter(transactionData => transactionData.type === 'expence').reduce(
        (acc, transactionData) => acc + transactionData.amount, 0);
    const totalExpenceTurnoverPercentage = (totalExpenceTurnover / totalTurnover) * 100
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100


    const categories = ['salary', "freelancer", "investment", "food", "entertainment", "education", "medical", "shopping", "travel", "text"]




    return (
        <div className='analatics-cards'>
            <div className='row'>
                <div className='col-md-4 mt-3'>
                    <div className='transaction-count'>
                        <h4>Total Transactions :{totalTransaction}</h4>
                        <hr />

                        <h5>Total Income :{totalIncomeTransaction.length}</h5>
                        <h5 >Total Expence :{totalExpenceTransaction.length}</h5>
                        <div className='progress-bars'>
                            <Progress className='mx-2 ' strokeColor='green' type='circle' percent={totalIncomeTransactionPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type='circle' percent={totalExpenceTransactionPercentage.toFixed(0) } />
                        </div>

                    </div>
                </div>

                <div className='col-md-4 mt-3'>
                    <div className='transaction-count'>
                        <h4>Total Turnover :{totalTurnover}</h4>
                        <hr />

                        <h5>Total Income :{totalIncomeTurnover}</h5>
                        <h5 >Total Expence :{totalExpenceTurnover}</h5>
                        <div className='progress-bars'>
                            <Progress className='mx-2 mt-2' strokeColor='green' type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type='circle' percent={totalExpenceTurnoverPercentage.toFixed(0)} />
                        </div>

                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-md-6 '>
                    <div className='income-category-analysis'>
                        {console.log(transactionData)}
                        <h4>Income - Category Wise</h4>
                        {categories.map((catagory) => {
                            const amount = transactionData.filter(transactionData => transactionData.type === 'income'
                                && transactionData.catagory
                                === catagory).reduce(
                                    (acc, transactionData) => acc + transactionData.amount, 0);
                                


                            return  amount>0 && <div className='category-card'>
                                <h5>{catagory}</h5>
                                <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                            </div>
                        })}
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='income-category-analysis'>
                        {console.log(transactionData)}
                        <h4>Expence - Category Wise</h4>
                        {categories.map((catagory) => {
                            const amount = transactionData.filter(transactionData => transactionData.type === 'expence'
                                && transactionData.catagory
                                === catagory).reduce(
                                    (acc, transactionData) => acc + transactionData.amount, 0);
                                


                            return amount>0 &&  <div className='category-card'>
                                <h5>{catagory}</h5>
                                <Progress percent={((amount / totalExpenceTurnover) * 100).toFixed(0)} />
                            </div>
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Analyatics