import React from 'react'
import { Dropdown, Menu } from 'antd';

import '../resources/default-layout.css'
import {  useNavigate } from 'react-router-dom';

function Layout(props) {
  const navigate = useNavigate();
  const user=JSON.parse(localStorage.getItem('sheymoney-client-user'))
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <li onClick={()=>
             { localStorage.removeItem('sheymoney-client-user')
            navigate('/login')}}
             >LogOut</li>
          ),
        },
      
      ]}
    />
  );
  return (
    <div className='layout'>
        <div className="header" >
           <div><h1 className='logo'>SHEY Money</h1></div> 
           
           <Dropdown overlay={menu} placement="bottomLeft">
        <button className='primary'>{user.data.name}</button>
      </Dropdown>
        </div>
        <div className='content'>
            {props.children} </div>
    </div>
  )
}

export default Layout