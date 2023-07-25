const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { AutorizationError } = require('../errors/AutorizationError');
const { ConflictError } = require('../errors/ConflictError');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
      res.status(200).header('auth-token', token).send({ token });
    })
    .catch(() => {
      next(new AutorizationError('Пользователь не зарегистрирован'));
    });
};

const register = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Данные не прошли валидацию'));
      } if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((next));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const patchUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};

const getMe = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  register,
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar,
  login,
  getMe,
};
