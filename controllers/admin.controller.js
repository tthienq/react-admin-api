const Admins = require("../models/admin");
const bcrypt = require('bcryptjs');

const adminController = {
  getAdminsAllInfor: async (req, res) => {
    try {
      //http://localhost:3000/#/users?filter=%7B%7D&order=ASC&page=1&perPage=10&sort=name
      if (typeof(req.query.filter) !== 'undefined') {
        var filter  = req.query.filter;
      } else var filter = null;
      
      if (filter !== '{}') {
        var nameFilter = filter.split('":"')[0].replace('{"','');
        var dataFilter = filter.split('":"')[1].replace('"}','');
      } else {
        var nameFilter = 'email';
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

      const admin = await Admins
        .find({ "email": { '$regex': dataFilter } })
        .sort([[nameSort, dataSort]])
        .limit(endRange - startRange + 1)
        .skip(Number(startRange))
      
      const data = [];
      for (var i = 0; i < admin.length; i++) {
        data.push({
          id: admin[i]._id,
          name: admin[i].name,
          fullname: admin[i].fullname,
          email: admin[i].email,
          studentID: admin[i].studentID,
          createdAt: admin[i].createdAt,
          updatedAt: admin[i].updatedAt,
          status: admin[i].status,
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
  getAdminInfor: async (req, res) => {
    try {
      const admin = await Admins.findOne({ _id: req.params.id }).select(
        "-password"
      );
      var data = {
        id: req.params.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      };
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const { id, name } = req.body;
      await Admins.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
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
  createAdminAccount: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const admin = await Admins.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: "This email already exists." });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newAdmin = new Admins({
        name,
        email,
        password: passwordHash,
      });
      await newAdmin.save();
      res.status(200).json({ id: newAdmin._id });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  },
  deleteAdminAccount: async (req, res) => {
    try {
      //console.log(req.params.id)
      await Admins.findByIdAndDelete(req.params.id);

      return res.status(200).json({ status: 'success' });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
};

module.exports = adminController;
