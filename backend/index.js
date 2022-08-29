// external recourse
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// internal route
const cors = require('cors');
const cloudinary = require('cloudinary');
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

cloudinary.config({
    cloud_name: 'ndmorsalin',
    api_key: '724633718269471',
    api_secret: 'FU9uApXYqgDlSS39TqaEPg5yGgY',
});
// cross
app.use(cors());

// parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);
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
