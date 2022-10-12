const express = require("express");
const dbConnect = require("./dbConnect")
const app = express()

app.use(express.json())
const path = require('path')

const userRoute = require('./routes/usersRoutes')
const transactionsRoutes = require('./routes/transactionRoute')
app.use('/api/transactions/',transactionsRoutes )
app.use('/api/users/', userRoute)


const port =process.env.PORT || 5000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}
app.listen(port, () => {
  console.log(`Example listening on port ${port}`)
})