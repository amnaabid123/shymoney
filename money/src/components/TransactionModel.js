import React, { useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import Spinner from './Spinner'
import axios from 'axios'


function TransactionModel({ model, setModel, getTransaction, showEditItem, setShowEditItem }) {
   
    // console.log(showEditItem);
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('sheymoney-client-user'))

    const userid = user.data._id;


    const onSumit = async (values) => {
        try {
            if (showEditItem) { 
                
                // console.log(showEditItem.date);
                await axios.post('/api/transactions/edit-transaction', {
                   
                    payload: { ...values, userid, },

                    transactionId: showEditItem._id
                })

                getTransaction()
                setLoading(true)
                setModel(false)
                setShowEditItem('')
                message.success('Transactions Updated successfully')
            } else {
                await axios.post('/api/transactions/add-transaction', { ...values, userid })

                getTransaction()
                setLoading(true)
                setModel(false)
                setShowEditItem(null)
                message.success('Transactions added successfully')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('something went wrong')
        }


    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setCancel = (values) => {
        getTransaction()
        setModel(false)
        setShowEditItem(null)
    };
    return (
        <Modal title={showEditItem ? 'Edit Transcation' : 'Add Transcation'}
            open={model} onCancel={setCancel} footer={false}>
            <Form layout='vertical' className='transcation-form' onFinish={onSumit}
             initialValues={showEditItem} 
             onFinishFailed={onFinishFailed}
             >



                <Form.Item label='Amount' name='amount' rules={[
                                {
                                    required: true,
                                    message: 'Please input your amount!',
                                },
                            ]}>

                    <Input type='text' />

                </Form.Item>

                <Form.Item label='Type' name='type'  rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}>
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value="expence">Expence</Select.Option></Select>
                </Form.Item>

                <Form.Item label='Catagory' name='catagory'  rules={[
                                {
                                    required: true,
                                    message: 'Please input your category!',
                                },
                            ]}>
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value="freelancer">Freelancer</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value='food'>Food </Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="shopping">Shopping</Select.Option>
                        <Select.Option value="travel">Travel</Select.Option>
                        <Select.Option value="text">Text</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item label='Date' name='date' rules={[
                    {
                        required: true,
                        message: 'Please input your date!',
                    },]}>
                            
                    <Input type='date' />
                </Form.Item>


                <Form.Item label='Reference' name='reference'  rules={[
                                {
                                    required: true,
                                    message: 'Please input your Reference',
                                },
                            ]}>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Description' name='description' rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}>
                    <Input type='text' />
                </Form.Item>
                {loading ? <Spinner /> :
                    <div className='d-flex justify-content-end'>
                        <button className='primary' type='submit'>Save</button>
                    </div>}
            </Form>
        </Modal>
    )
}

export default TransactionModel