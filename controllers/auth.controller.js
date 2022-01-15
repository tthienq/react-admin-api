const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admins = require("../models/admin");

// Auth
module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admins.findOne({ email });
    if (!admin)
      return res.status(400).json({
        status: 'error',
        message: 'Authentication is incorrect',
        errors: {
          email: 'Email is incorrect',
        },
      });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({
        status: 'error',
        message: 'Authentication is incorrect',
        errors: {
          password: 'Password is incorrect',
        },
      });
    const token = createAccessToken({ id: admin._id });
    
    var data = {
      id: admin._id,
      fullname: admin.email,
      avatar: admin.avatar
    };
    res.status(200).json({
      status: 'success',
      data: {
        token,
        adminInfo: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
