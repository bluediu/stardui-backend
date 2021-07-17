const { Router } = require('express');
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUser,
  patchUsers,
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUser);

router.patch('/', patchUsers);

module.exports = router;
