require('dotenv/config');
require('express-async-errors');

const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
});