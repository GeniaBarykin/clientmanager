const Router = require('express').Router;
const clientController = require('../controllers/client-controller');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/refresh', userController.refresh)
router.get('/clients', authMiddleware, clientController.getClients)

module.exports = router