// const express = require('express');
// require('express-async-errors');
// const morgan = require('morgan'); // HTTP req logger
// const cors = require('cors'); // security
// const csurf = require('csurf'); // security, deprecated
// const cookieParser = require('cookie-parser');
// const { ValidationError } = require('sequelize');
// const path = require('path')

// // require routers

// const { environment } = require('./config');
// const isProduction = environment === 'production';

// const app = express();
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cookieParser());

// /* --------------------------- Enable CORS --------------------------- */

// app.use(cors({
//     origin: 'http://localhost:5001',
//     credentials: true
// }));

// /* --------------------------- Enable CRSF Protection --------------------------- */

// app.use(csurf({
//     cookie: {
//         sameSite: 'strict',
//         secure: true,
//         httpOnly: true
//     }
// }));

// /* ------------------------ Frontend Files -------------------------- */


// /* ------------------------- API Endpoints -------------------------- */



// const port = 8000;
// app.listen(port, () => console.log(`Server is listening on port ${port}`));