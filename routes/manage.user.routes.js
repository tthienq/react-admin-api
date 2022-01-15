const router = require('express').Router();
const userController = require('../controllers/user.controller');
const rangeMdw = require('../middleware/range.mdw');

router.get('/', rangeMdw, userController.getUsersAllInfor);
router.get('/:id', rangeMdw, userController.getUserInfor);
router.put('/:id', rangeMdw, userController.updateUser)
router.delete('/:id', rangeMdw, userController.deleteUser)

module.exports = router