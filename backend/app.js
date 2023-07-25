require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errors = require('./middlewares/errors');
const { SERVER_PORT, DB } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NOT_FOUND_ERROR_CODE } = require('./errors/NotFoundError');

const {
  register, login,
} = require('./controllers/users');

const app = express();

mongoose.connect(DB);

app.use(requestLogger);

app.use('/', bodyParser.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/signup', register);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Такой страницы нет' });
});

app.use(errorLogger);

app.use(errors);

app.listen(SERVER_PORT, () => {
  console.log('Сервер запущен');
});
