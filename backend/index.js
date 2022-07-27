// external recourse
const express = require('express');
const cookieParser = require('cookie-parser');
// internal route
const productRoute = require('./router/productRoute');
const userRoute = require('./router/userRoute');
const orderRoute = require('./router/orderRoute');
const db = require('./DB/db');
const { notFoundError, defaultError } = require('./middleware/common/errorHandler');

const app = express();
// environment variables
require('dotenv').config();
// connect db
db();

// parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// router
app.use('/api/v1/', productRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', orderRoute);
// not found page
app.use(notFoundError);

// Default error
app.use(defaultError);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
