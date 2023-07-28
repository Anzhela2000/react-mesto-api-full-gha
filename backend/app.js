require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errors = require('./middlewares/errors');
const { SERVER_PORT, DB } = require('./utils/config');

const { NOT_FOUND_ERROR_CODE } = require('./errors/NotFoundError');

const {
  register, login,
} = require('./controllers/users');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());

mongoose.connect(DB);

app.use(requestLogger);

app.use(limiter);

app.use('/', bodyParser.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', register);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => next(new NOT_FOUND_ERROR_CODE('Страница не найдена.')));

app.use(errorLogger);

app.use(errors);

app.listen(SERVER_PORT);
