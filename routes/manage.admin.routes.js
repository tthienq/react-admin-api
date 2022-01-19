const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const rangeMdw = require('../middleware/range.mdw');

router.get('/', rangeMdw, adminController.getAdminsAllInfor);
router.get('/:id', rangeMdw, adminController.getAdminInfor);
router.post('/', rangeMdw, adminController.createAdminAccount);
router.put('/:id', rangeMdw, adminController.updateAdmin);
router.delete('/:id', rangeMdw, adminController.deleteAdminAccount)

module.exports = router