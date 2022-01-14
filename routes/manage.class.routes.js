const router = require('express').Router();
const classroomController = require('../controllers/classroomController');
const rangeMdw = require('../middleware/range.mdw');

router.get('/', rangeMdw, classroomController.getClassAllInfor);
router.get('/:id', rangeMdw, classroomController.getClassInfor);
router.get('/:id/students', rangeMdw, classroomController.getStudentsInClass);
router.get('/:id/teachers', rangeMdw, classroomController.getTeachersInClass);
router.put('/:id', rangeMdw, classroomController.updateClass);
// router.get('/classes/:id', rangeMdw, classroomController.getClassInfor);
// router.put('/classes/:id', rangeMdw, classroomController.updateClass)
// router.delete('/classes/:id', rangeMdw, classroomController.deleteClass)

module.exports = router