const router = require('express').Router();
const adminController = require('../controllers/adminController');
const rangeMdw = require('../middleware/range.mdw');

router.get('/', rangeMdw, adminController.getAdminsAllInfor);
// router.get('/:id', rangeMdw, userController.getUserInfor);
// router.put('/:id', rangeMdw, userController.updateUser)
// router.delete('/:id', rangeMdw, userController.deleteUser)

module.exports = router