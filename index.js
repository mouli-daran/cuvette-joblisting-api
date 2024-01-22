const app = require('./app');
require('dotenv').config();
const connectWithDb = require('./config/db');


connectWithDb();

app.listen(process.env.PORT, (req , res) => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
})