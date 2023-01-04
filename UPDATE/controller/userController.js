"use strict";
const admin = require("../models/admin-user");
const leave = require("../models/leave");
const toDo = require("../models/todo");
const noti = require("../models/notifications");
const mongoose = require("mongoose");
const news = require("../models/events");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const register = require("../models/register"),
  auth = require("../middleware/auth"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

//request new leave
exports.Leave_of = async function (req, res) {
  try {
    // Get user inputs
    const {
      SelectType,
      Leaves,
      Note,
      AddMember,
      startTime,
      endTime,
      startDate,
      endDate,
    } = req.body;
    const user = req.params.id;

    // Validate user input
    if (!(SelectType && Leaves && Note && AddMember)) {
      res.status(400).send("All input is required");
    }
    let time_of = new leave({
      SelectType,
      Leaves,
      startDate,
      endDate,
      startTime,
      endTime,
      Note,
      AddMember,
      user,
    });
    time_of.save();
    return res.json({
      data: time_of,
      message: "Record save successful..!",
      code: 200,
    });
  } catch (err) {
    console.log("err.message");
    return res.json({ message: err.message });
  }
};

//get leave list particular user
exports.getLeaveList = async function (req, res) {
  try {
    const allleaves = await leave.find({ user: req.params.id });
    res.json(allleaves);
  } catch (error) {
    next(error);
  }
};

//get all leaves
exports.Leaves = async function (req, res) {
  try {
    const all_leave_requests = await leave.find();
    res.json(all_leave_requests);
  } catch (error) {
    next(error);
  }
};

//get user Name
exports.getUserName = async function (req, res) {
  try {
    const user_Name = await register.findById(req.params.id);
    res.json(user_Name);
  } catch (error) {
    next(error);
  }
};

//To do
exports.toDo = async function (req, res) {
  try {
    const {
      taskName,
      taskType,
      addMember,
      DueDate,
      Description,
      statusType,
      status,
    } = req.body;

    // Validate  input
    if (!(taskName && taskType && addMember && DueDate && Description)) {
      res.status(400).send("All input is required");
    }
    let checklist = new toDo({
      taskName,
      taskType,
      addMember,
      DueDate,
      Description,
      statusType,
      status,
    });
    checklist.save();
    return res.json({
      data: checklist,
      message: "Record save successful..!",
      code: 200,
    });
  } catch (err) {
    console.log("err.message");
    return res.json({ message: err.message });
  }
};

//task list
exports.tasklist = async function (req, res) {
  try {
    let checklist;
    if (req.body.addMember) {
      checklist = await toDo.find({});
    } else {
      checklist = await toDo.find({});
    }
    if (checklist) {
      return res.json({
        data: checklist,
        message: "Data fetched successful..!",
        code: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};

//register
exports.register_user = async function (req, res) {
  try {
    //user input
    const { userName, email, password } = req.body;
    console.log("step 1");
    // Validate user input
    if (!(userName && email && password)) {
      throw "All input is required";
    }
    const oldUser = await register.findOne({ email });

    if (oldUser) {
      throw "user exist";
    }
    console.log("step 2");
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = new register({
      userName,
      email,
      password: encryptedPassword,
    });
    console.log("step 3");
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: 400000,
      }
    );
    console.log("step 4");
    // save user token
    user.token = token;
    console.log("Step 5");
    // return new user
    res.status(200).json(user);
    user.save();
  } catch (err) {
    res.json(err);
  }
};

//login user && admin
exports.Login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await register.findOne({ email });
    if (!user) {
      res.json("user not found");
    }
    if (
      user === null ||
      (await bcrypt.compare(password, user.password)) === false
    ) {
      res.status(400).send("Invalid Credentials");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "400000",
        }
      );
      req.user = user;
      user.token = token;
      res.status(200).json(user);
    } else {
      res.status(200).json({ msg: "password not match!" });
    }
  } catch (err) {
    console.log("err", err);
    res.json({ message: err });
  }
};

//admin schema
exports.register_admin = async function (req, res) {
  try {
    //user input
    const { fullName, email, password } = req.body;

    // Validate user input
    if (!(fullName && email && password)) {
      throw "All input is required";
    }

    let username = email;

    let r = new RegExp(`${username.split("@")[1]}`);

    let old = await register.find();
    for (let i = 0; i < old.length; i++) {
      if (r.test(old[i])) {
        throw "domain already exist";
      }
    }
    const oldUser = await register.findOne({ email });

    if (oldUser) {
      throw "user exist";
    }

    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = new register({
      fullName,
      email,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: 400000,
      }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(200).json(user);
    user.save();
  } catch (err) {
    res.json(err);
  }
};

//user registration by admin panel only
exports.New_user = async function (req, res) {
  try {
    //user input
    const { fullName, email, password, position, manager, admin, joinDate } =
      req.body;
    console.log("step 1");
    // Validate user input
    if (!(fullName && email && password)) {
      throw "All input is required";
    }
    const oldUser = await register.findOne({ email });

    if (oldUser) {
      throw "user exist";
    }
    console.log("step 2");
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = new register({
      joinDate,
      admin,
      fullName,
      email,
      position,
      manager,
      password: encryptedPassword,
    });
    console.log("step 3");
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: 400000,
      }
    );
    console.log("step 4");
    // save user token
    user.token = token;
    console.log("Step 5");
    // return new user
    res.status(200).json(user);
    user.save();
  } catch (err) {
    res.json(err);
  }
};

//admin login
exports.adminLogin = async function (req, res) {
  console.log("login api called");
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await admin.findOne({ email });

    if (
      user === null ||
      (await bcrypt.compare(password, user.password)) === false
    ) {
      res.status(400).send("Invalid Credentials");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "259200000",
        }
      );
      req.user = admin;
      user.token = token;
      res.status(200).json(user);
      const userToekn = user.token;
      const userId = user.id;
    } else {
      res.status(200).json({ msg: "password not match!" });
    }
  } catch (err) {
    console.log("err", err);
    res.json(err.message);
  }

  console.log("executed");
};
//get all employees
exports.Employees = async function (req, res) {
  try {
    const all_users_data = await register
      .find()
      .select([
        "admin",
        "fullName",
        "email",
        "number",
        "position",
        "manager",
        "office",
        "profile_pic",
      ]);
    res.send(all_users_data);
  } catch (error) {
    res.send(error);
  }
};

//get all employees
exports.Tasks = async function (req, res) {
  try {
    const all_tasks = await toDo.find();

    res.send(all_tasks);
  } catch (error) {
    res.send(error);
  }
};

//get particular task
exports.GetTasks = async function (req, res, next) {
  try {
    const userTask = await toDo.find({ addMember: req.params.id });
    res.send(userTask);
  } catch (error) {
    next(error);
  }
};

//update particular task
exports.UpdateTask = async function (req, res) {
  try {
    const updatedTask = await toDo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { done: true, status: "Completed", statusType: "success" } },
      { new: true }
    );

    res.send(updatedTask);
  } catch (error) {
    res.next(error);
  }
};

//update particular task
exports.UpdateLeave = async function (req, res) {
  try {
    const newobj = {
      Approved: "success",
      Pending: "warning",
      Rejected: "danger",
    };
    const value = req.body.status;
    const updatedLeave = await leave.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: value, statusType: newobj[value] } },
      { new: true }
    );

    res.send(updatedLeave);
  } catch (error) {
    res.next(error);
  }
};

//update profile
exports.updateProfile = async function (req, res, next) {
  try {
    const {
      fullName,
      number,
      Gender,
      DOB,
      Address,
      City,
      Country,
      Postal,
      Bank_name,
      Account_name,
      Account_no,
      Branch,
    } = await req.body;
    console.log(req.params.id);
    const userInfo = await register.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fullName: fullName,
          number: number,
          Info: {
            DOB: DOB,
            Gender: Gender,
            Address: {
              Address: Address,
              City: City,
              Country: Country,
              Postal: Postal,
            },
            Bank: {
              Bank_name: Bank_name,
              Account_name: Account_name,
              Account_no: Account_no,
              Branch: Branch,
            },
          },
        },
      },
      { new: true }
    );
    res.json(userInfo);
    next();
  } catch (error) {
    res.json(error.message);
  }
};

//my profile
exports.MyProfile = async function (req, res, next) {
  try {
    const myprofile = await register.findById(req.params.id);
    res.json(myprofile);
  } catch (error) {
    res.json(error);
  }
};

//get admin profile
exports.MyAdminProfile = async function (req, res, next) {
  try {
    const myprofile = await admin.findById(req.params.id);
    res.json(myprofile);
  } catch (error) {
    res.json(error);
  }
};

//get dob
exports.date = async function (req, res, next) {
  try {
    const userDate = await register
      .find()
      .select(["Info.DOB", "fullName", "profile_pic", "joinDate"]);
    res.json(userDate);
    next();
  } catch (error) {
    next(error);
  }
};

//delete user
exports.deleteuser = async function (req, res, next) {
  try {
    let setuser = await register.findById(req.params.id);
    if (!setuser) {
      res.json({ msg: "uer not found" });
    } else {
      let delUser = await register.findByIdAndDelete(req.params.id);
      res.json(delUser);
    }
  } catch (error) {
    res.json({ msg: "error" });
    next();
  }
};

//delete task
exports.deltask = async function (req, res, next) {
  try {
    let setuser = await toDo.findById(req.params.id);
    if (!setuser) {
      res.json({ msg: "uer not found" });
    } else {
      let delUser = await toDo.findByIdAndDelete(req.params.id);
      res.json(delUser);
    }
  } catch (error) {
    res.json({ msg: "error" });
    next();
  }
};

//delete notification
exports.delNoti = async function (req, res, next) {
  try {
    let setuser = await noti.findById(req.params.id);
    if (!setuser) {
      res.json({ msg: "noti not found" });
    } else {
      let delUser = await noti.findByIdAndDelete(req.params.id);
      res.json(delUser);
    }
  } catch (error) {
    res.json({ msg: "error" });
    next();
  }
};

//add notification for user
exports.NotifyUser = async function (req, res, next) {
  try {
    const { user, notificationmsg } = req.body;
    const date = Date.now();
    let notification = new noti({
      user,
      notificationmsg,
      date,
    });

    notification.save();
    res.json({ notification });
  } catch (error) {
    next(error);
  }
};

//get all notifications by tasks
exports.getNotifications = async function (req, res, next) {
  try {
    const allnoti = await noti.find({ user: req.params.id });

    res.json(allnoti);
  } catch (error) {
    next(error);
  }
};

//passwor reset

//1. forgot password
exports.forgotPass = async (req, res, next) => {
  try {
    const email = req.body.email;

    let user = await register.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    const temp = randomstring.generate();
    sendresetmail(user.fullName, user.email, temp);

    await register.findByIdAndUpdate(
      { _id: user.id },
      { $set: { temp: temp } },
      { new: true }
    );

    res.status(200).send("Email sent");
  } catch (err) {
    res.status(400).json({
      msg: "not found",
    });
    next();
  }
};

const sendresetmail = async (fullName, email, temp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "krista56@ethereal.email",
        pass: "KxrjUz7SEwUUuJGBgN",
      },
    });

    const mailOptions = {
      from: "krista56@ethereal.email",
      to: "wirova3970@fdsdfdfddfddfdfdfdd.com",
      subject: "Reset password",
      html:
        '<p> Hi, please click <a href="http://localhost:8080/#/resetpassword?token=' +
        temp +
        '"> here</a>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail sent", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//2. reset password
exports.resetPass = async (req, res) => {
  try {
    const temp = req.query.token;
    const tokenData = await register.findOne({ temp: temp });
    if (!temp) {
      res.status(400).json({
        msg: "invalid token",
      });
    }

    const password = req.body.newPassword;
    const updatedPassword = await bcrypt.hash(password, 10);

    const userData = await register.findByIdAndUpdate(
      { _id: tokenData.id },
      { $set: { password: updatedPassword, temp: "" } },
      { new: true }
    );

    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
};

//events/news
exports.event = async function (req, res) {
  try {
    const { title, eventDate, detail } = req.body;

    let occasions = new news({
      title,
      eventDate,
      detail,
    });
    res.json(occasions);
    occasions.save();
  } catch (error) {
    res.json(error.message);
  }
};

//get events/news
exports.getevent = async function (req, res) {
  try {
    const allnoti = await news.find({ user: req.params.id });

    res.json(allnoti);
  } catch (error) {
    next(error);
  }
};

//dashboard
exports.getUserupdate = async function (req, res) {
  try {
    const userdetails = await register.find();
    const thisday = await leave.find();
    res.json({ userdetails, thisday });
  } catch (error) {
    next(error);
  }
};

exports.getleaveupdate = async function (req, res) {
  try {
    const thisday = await leave.find();
    res.json(thisday);
  } catch (error) {
    next(error);
  }
};

//testing authorization
exports.auth = function (req, res) {
  res.status(200).send("Welcome to the BLACK PEARL site ");
};
