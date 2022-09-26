const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const productRoute = require('./routes/productRoute')
const uploadRoute = require('./routes/uploadRoute')
const config = require('./config')

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express()

app.use(bodyParser.json())
app.use('/api/upload', uploadRoute)
app.use('/api/users', userRoute)
app.use('/api/order', orderRoute)
app.use('/api/product', productRoute)
app.get('/api/config/paypal', (req, res) =>{
    res.send(config.PAYPAL_CLIENT_ID)
})
app.use('/uploads', express.static(path.join(__dirname, /../uploads )))



app.listen(config.PORT, () => {
    console.log(`server connected successfully to ${PORT}`);
})