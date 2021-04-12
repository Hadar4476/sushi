const dotENV = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');

const auth = require('./routes/auth');
const users = require('./routes/users');
const dishTypes = require('./routes/dishTypes');

dotENV.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to mongodb database: sushi successfully.');
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/auth', auth);
app.use('/dishTypes', dishTypes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3006;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});
