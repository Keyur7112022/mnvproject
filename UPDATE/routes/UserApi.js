"use strict";

const auth = require("../middleware/auth");

module.exports = function (app) {
  const UserApi = require("../controller/userController");

  //request for the leave
  app.route("/leave/:id").post(UserApi.Leave_of);

  //Hr get all the leave list And the Admin who are add can also se the request
  app.route("/getLeaveList/:id").get(UserApi.getLeaveList);

  //get all leaves (only for admin)
  app.route("/leavereq").get(UserApi.Leaves);

  //add task by admin
  app.route("/Checklist").post(UserApi.toDo);

  //user can see tasks
  app.route("/my-task").post(UserApi.tasklist);

  //register
  app.route("/register").post(UserApi.register_admin);

  //user register by admin portal
  app.route("/register/user").post(UserApi.New_user);

  //user login
  app.route("/login").post(UserApi.Login);

  app.route("/employees").get(UserApi.Employees);

  app.route("/alltask").get(UserApi.Tasks);

  //get all leaves just user NAME
  app.route("/usertask/:id").get(UserApi.getUserName);

  app.route("/tasks/:id").get(UserApi.GetTasks);

  app.route("/updatetask/:id").post(UserApi.UpdateTask);

  //admin leave management
  app.route("/updateleavestatus/:id").post(UserApi.UpdateLeave);

  //admin-user
  app.route("/login/admin").post(UserApi.adminLogin);

  //edit user profile
  app.route("/updateprofile/:id").post(UserApi.updateProfile);
  //get profile
  app.route("/myprofile/:id").get(UserApi.MyProfile);

  //get admin profile
  app.route("/myadminprofile/:id").get(UserApi.MyAdminProfile);

  app.route("/dates").get(UserApi.date);

  //delete user
  app.route("/deleteuser/:id").delete(UserApi.deleteuser);

  //delete task
  app.route("/deltask/:id").delete(UserApi.deltask);

  //delete notifications
  app.route("/deletenoti/:id").delete(UserApi.delNoti);

  //create notification
  app.route("/notify").post(UserApi.NotifyUser);

  //get all notification by id
  app.route("/notify/:id").get(UserApi.getNotifications);

  //reset password
  app.route("/forgot").post(UserApi.forgotPass);
  app.route("/resetpass").post(UserApi.resetPass);

  //events
  app.route("/events").post(UserApi.event);

  app.route("/getevent").get(UserApi.getevent);

  //dashboard
  app.route("/userprofiles").get(UserApi.getUserupdate);

  app.route("/leaveupdate").get(UserApi.getleaveupdate);
};
