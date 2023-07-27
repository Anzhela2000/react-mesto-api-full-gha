const mongoose = require('mongoose');
const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user;
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } if (card.owner.toString() !== owner._id) {
        throw new NotFoundError('Карточка недоступна для удаления.');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка.'));
        next(err);
      }
    });
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
