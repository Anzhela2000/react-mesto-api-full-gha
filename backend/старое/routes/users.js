const router = require('express').Router();

const {
  getUsers, getUser, patchUser, patchUserAvatar, getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/users/me', getMe);
router.patch('/me', patchUser);
router.get('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
