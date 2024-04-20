const Router = require('express').Router;
const clientController = require('../controllers/client-controller');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.post('/clients', authMiddleware, clientController.getClients)
router.post('/changestatus', authMiddleware, clientController.changeStatus)
module.exports = router