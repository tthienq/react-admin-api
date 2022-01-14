const Classrooms = require("../models/classroom");
const Users = require("../models/user");

const classController = {
  getClassAllInfor: async (req, res) => {
    try {
      if (typeof(req.query.filter) !== 'undefined') {
        var filter  = req.query.filter;
      } else var filter = null;
      
      if (filter !== '{}') {
        var nameFilter = filter.split('":"')[0].replace('{"','');
        var dataFilter = filter.split('":"')[1].replace('"}','');
      } else {
        var nameFilter = 'name';
        var dataFilter = '';
      }
      
      if (typeof(req.query.sort) !== 'undefined') {
        var sort  = req.query.sort;
      } else var sort = null;
      
      if (sort) {
        var nameSort = sort.split('","')[0].replace('["','');
        var dataSort = sort.split('","')[1].replace('"]','');
      } else {
        var nameSort = 'id';
        var dataSort = 'ASC';
      }

      //{ filter: '{"name":"c"}', range: '[0,9]', sort: '["name","ASC"]'
      if (typeof(req.query.range) !== 'undefined') {
        var range  = req.query.range;
      } else var range = null;
      if (sort) {
        var startRange = range.split(',')[0].replace('[','')
        var endRange = range.split(',')[1].replace(']','')
      } else {
        var startRange = 0;
        var endRange = 9;
      }


      const classrooms = await Classrooms
      .find({ "name": { '$regex': dataFilter } })
      .sort([[nameSort, dataSort]])
      .limit(endRange - startRange + 1)
      .skip(Number(startRange))
      
      const data = [];
      for (var i = 0; i < classrooms.length; i++) {
        data.push({
          id: classrooms[i]._id,
          name: classrooms[i].name,
          desc: classrooms[i].desc,
          topic: classrooms[i].topic,
          room: classrooms[i].room,
          students: classrooms[i].students,
          teachers: classrooms[i].teachers,
          createdAt: classrooms[i].createdAt,
          updatedAt: classrooms[i].updatedAt,
        });
      }
      return res.json(data);
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  getClassInfor: async (req, res) => {
    try {
      const classroom = await Classrooms.findOne({ _id: req.params.id })
      var data = {
        id: req.params.id,
        name: classroom.name,
        desc: classroom.desc,
        topic: classroom.topic,
        room: classroom.room,
        teachers: classroom.teachers,
        students: classroom.students,
        studentID: classroom.studentID,
        createdAt: classroom.createdAt,
        updatedAt: classroom.updatedAt,
      };
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  getStudentsInClass: async (req, res) => {
    try {
      const classroom = await Classrooms.findOne({ _id: req.params.id })
      if (classroom) {
        const studentList = [];
        for (var i = 0; i < classroom.students.length; i++) {
          var c = await Users.findById(classroom.students[i]);
          if (c !== "") {
            studentList.push({
              id: c.id,
              name: c.name,
              fullname: c.fullname,
              avatar: c.avatar,
              studentID: c.studentID,
            });
          }
        }
        res.status(200).json({
          status: 'success',
          data: studentList,
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: "Classroom not exist",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
    
  },
  getTeachersInClass: async (req, res) => {
    try {
      const classroom = await Classrooms.findOne({ _id: req.params.id })
      if (classroom) {
        const teacherList = [];
        for (var i = 0; i < classroom.teachers.length; i++) {
          var c = await Users.findById(classroom.teachers[i]);
          if (c !== "") {
            teacherList.push({
              id: c.id,
              name: c.name,
              fullname: c.fullname,
              avatar: c.avatar,
            });
          }
        }
        res.status(200).json({
          status: 'success',
          data: teacherList,
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: "Classroom not exist",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
    
  },
  updateClass: async (req, res) => {
    try {
      const { id, name, desc, topic, room } = req.body;
      //const classroom = await Classrooms.findOne({ _id: id });
      await Classrooms.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          desc,
          topic,
          room
        }
      );
      res.status(200).json({ id: id });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  
};


module.exports = classController;
