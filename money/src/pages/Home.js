
import { DatePicker, message, Select, Table, } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import TransactionModel from '../components/TransactionModel'
import '../resources/transcation.css'
import moment from 'moment'
import Analyatics from '../components/Analyatics';
import { IconButton, Tooltip } from '@mui/material';


function Home() {
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all')
  const [viewType, setViewType] = useState('table');
  const [transactionData, setTransactionData] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [model, setModel] = useState(false)

  const { RangePicker } = DatePicker;
  const user = JSON.parse(localStorage.getItem('sheymoney-client-user'));
  const [showEditItem, setShowEditItem] = useState(null)
  const userid = user.data._id;


  const getTransaction = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/transactions/get-all-transaction',
        { userid, frequency, ...(frequency === 'custom' && { selectedRange }), type })
      console.log(response.data);
      setTransactionData(response.data)
      setLoading(false)


    } catch (error) {
      setLoading(false)
      message.error('something went wrong')
    }
  }

  const deleteTransaction = async (record) => {
    try {
      setLoading(true)
      await axios.post('/api/transactions/delete-transaction',
        { transactionId: record._id })
      message.success('Transactions deleted successfully')
      getTransaction()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('something went wrong')
    }
  }
  useEffect(() => {

    getTransaction()
  }, [frequency, selectedRange, type])// eslint-disable-line react-hooks/exhaustive-deps

  const column = [

    {


      title: 'Date', dataIndex: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Category', dataIndex: 'catagory' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Reference', dataIndex: 'reference' },
    {
      title: 'Actions', dataIndex: 'action',
      render: (text, record) => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        return (
          <div className='d-flex '>
            <Tooltip title='Edit'>
              <IconButton>
                < BorderColorOutlinedIcon className='me-3' onClick={() => {

                  setShowEditItem(record, record.date)
                  setModel(true)

                }} />
              </IconButton>
            </Tooltip>

            <Tooltip title='Delete'>
              <IconButton>
                <DeleteIcon onClick={() => deleteTransaction(record)} />
              </IconButton>
            </Tooltip>
          </div>)
      }
    },

  ]






  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters d-flex justify-content-between align-items-center'>
        <div className='homeHead d-flex'>
          <div className='d-flex flex-column'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>

            {frequency === 'custom' &&
              (<div className='mt-2'>
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} /></div>)}



          </div>
          <div className='d-flex flex-column mx-5'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='expence'>Expence</Select.Option>
              <Select.Option value='income'>Income</Select.Option>


            </Select>





          </div>
        </div>
        <div className='d-flex' >
          <div>
            <div className='toogle mx-3'>
              <UnorderedListOutlined className={`me-3 ${viewType === 'table' ? "active-icons" : "inactive-icons"} `} size={30}
                onClick={() => setViewType('table')} />
              <AreaChartOutlined className={`${viewType === 'analytics' ? "active-icons" : "inactive-icons"} `} size={30}
                onClick={() => setViewType('analytics')} />
            </div></div>

          <button className='primary' onClick={() => setModel(true)}>Add New</button>

        </div>

      </div>
      <div className='analytics mt-3'>
        {viewType === 'table' ? <div className='table-analytics'>
          <Table className='ant-table ant-col ant-col-xs-24 ant-col-xl-8 '{...{ pageSizeOptions: ['30', '40'], showSizeChanger: true }} columns={column} dataSource={transactionData} />
        </div> : <Analyatics transactionData={transactionData} />}

      </div>

      {model && <TransactionModel
        model={model} setModel={setModel} getTransaction={getTransaction}
        showEditItem={showEditItem} setShowEditItem={setShowEditItem} />}

    </Layout>
  )
}

export default Home