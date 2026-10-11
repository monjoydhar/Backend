 const app = require('./app');
 const ConnectDB = require('./config/database');
 const dotenv = require('dotenv').config();

ConnectDB();




 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
