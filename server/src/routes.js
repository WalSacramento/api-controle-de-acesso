import { Router } from 'express'

import UserController from './controller/UserController.js';
import AcessController from './controller/AcessController.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.route('/users')
  .get(UserController.getUsers)
  .post(UserController.createUser)

router.route('/user/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

router.route('/acess')
  .post(AcessController.createAcess)

export { router }
