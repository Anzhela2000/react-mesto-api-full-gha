const router = require('express').Router();
const {
  createCard, getCards, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
