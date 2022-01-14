const router = require('express').Router();
const userController = require('../controllers/userController');
const rangeMdw = require('../middleware/range.mdw');

router.get('/users', rangeMdw, userController.getUsersAllInfor);
router.get('/users/:id', rangeMdw, userController.getUserInfor);
router.put('/users/:id', rangeMdw, userController.updateUser)
router.delete('/users/:id', rangeMdw, userController.deleteUser)


module.exports = router