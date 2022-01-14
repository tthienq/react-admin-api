const Users = require("../models/user");

const userController = {
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id }).select(
        "-password"
      );
      var data = {
        id: req.params.id,
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        studentID: user.studentID,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        role: user.role,
      };
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const user = await Users.find().select("-password");
      //console.log(user)
      const data = [];
      for (var i = 0; i < user.length; i++) {
        data.push({
          id: user[i]._id,
          name: user[i].name,
          fullname: user[i].fullname,
          email: user[i].email,
          studentID: user[i].studentID,
          createdAt: user[i].createdAt,
          updatedAt: user[i].updatedAt,
          status: user[i].status,
          role: user[i].role,
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
  updateUser: async (req, res) => {
    try {
      console.log(req.body);
      const { id, name, fullname, status, statusNum, studentID } = req.body;
      if (studentID === null) { //TH1: delete studentId 
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            fullname,
            studentID: "",
            status: statusNum === true ? Number(1) : Number(2),
          }
        );
        res.status(200).json({ id: id });
      } else {
        const user = await Users.findOne({ _id: id });
        if (user.studentID !== studentID) { //TH2: update studentId !== current studentId
          const userTemp = await Users.findOne({ studentID });
          if (userTemp)
            return res.status(400).json({
              status: "error",
              message: "This studentID already exists in other account.",
            });
          await Users.findOneAndUpdate(
            { _id: req.params.id },
            {
              name,
              fullname,
              studentID: studentID,
              status: statusNum === true ? Number(1) : Number(2),
            }
          );
          res.status(200).json({ id: id });
        } else { //TH3: update studentId = current studentId
          await Users.findOneAndUpdate(
            { _id: req.params.id },
            {
              name,
              fullname,
              status: statusNum === true ? Number(1) : Number(2),
            }
          );
          res.status(200).json({ id: id });
        }
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      console.log(req.params.id)
      await Users.findByIdAndDelete(req.params.id);
      
      return res.status(200).json({ status: 'success' });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
};

module.exports = userController;
