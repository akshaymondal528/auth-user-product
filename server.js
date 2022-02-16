const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', require('./routes/productRoute'));
app.use('/users', require('./routes/userRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server run on http://localhost:${port}`));
