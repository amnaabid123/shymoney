import { Form, Input, message } from 'antd'
import 'antd/dist/antd.css'
import '../resources/authentication.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(true);
    const onSumit = async (values) => {
        try {
            setLoading(true)
            await axios.post('/api/users/register', values)
            setLoading(false)
            message.success('register successfully')
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('something went wrong')
        }

    }
    useEffect(() => {
        if (localStorage.getItem('sheymoney-client-user')) {
          return  navigate('/')
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className='row justify-content-center align-items-center w-100 h-100'>
                <div className='col-md-5'>
                    <div className='lottie'>

                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_ikaawl5v.json"
                            background="transparent"
                            speed="1"
                            loop autoplay>

                        </lottie-player>
                    </div>

                </div>

                <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onSumit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                        <h1 style={{ fontSize: 30 }}>SHEY-MONEY/Register</h1>

                        <Form.Item label='Name' name='name' rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}>

                            <Input />

                        </Form.Item>

                        <Form.Item label='Email' name='email'rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}>

                            <Input />

                        </Form.Item><Form.Item label='Password' name='password' rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>

                            <Input />

                        </Form.Item>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/login'>Already Have Account , Click Here To Login</Link>
                            <button className='primary' type='submit'>Register</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register