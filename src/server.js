const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');

const corsOptions = {
  origin: 'http://localhost:5000'
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
routes(app);

const port = 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`running in localhost:${port}`);
});
