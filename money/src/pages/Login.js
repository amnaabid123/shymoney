import { Form, Input, message } from 'antd'

import '../resources/authentication.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../components/Spinner'

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const onSubmit = async (values) => {

        try {
            setLoading(true)
            const result = await axios.post('/api/users/login', values)

            const response = localStorage.setItem('sheymoney-client-user', JSON.stringify(result))
            console.log(response);
            setLoading(false)
            message.success('Login successfully')
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('something went wrong')
        }

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (localStorage.getItem('sheymoney-client-user')) {
            navigate('/')
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className='row justify-content-center align-items-center w-100 h-100'>


                <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <h1>SHEY-MONEY / Login</h1>
                        <br />


                        <Form.Item label='Email' name='email' rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}>

                            <Input />

                        </Form.Item><Form.Item label='Password' name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}>

                            <Input />

                        </Form.Item>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register'>Not Register Yet , Click Here To Register</Link>
                            <button className='primary' type='submit'>Login</button>
                        </div>
                    </Form>

                </div>
                <div className='col-md-5'>
                    <div className='lottie'>

                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_ikaawl5v.json"
                            background="transparent"
                            speed="1"
                            loop autoplay>

                        </lottie-player>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login