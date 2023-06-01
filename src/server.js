require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');

// const corsOptions = {
//     origin: `http://${process.env.HOST}:${process.env.PORT}`
// };
app.use(cors());

app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`running in http://${process.env.HOST}:${process.env.PORT}`);
});
