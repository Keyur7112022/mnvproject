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
  app.route("/register").post(UserApi.register_admin);//no auth

  //user register by admin portal
  app.route("/register/user").post(UserApi.New_user);//no auth

  //user login
  app.route("/login").post(UserApi.Login); //no Auth

  //get all the employee details
  app.route("/employees").get(UserApi.Employees);

  //get all the task to user side
  app.route("/alltask").get(UserApi.Tasks);

  //get all leaves just user name
  app.route("/usertask/:id").get(UserApi.getUserName);

  app.route("/tasks/:id").get(auth, UserApi.GetTasks);

  app.route("/updatetask/:id").post(UserApi.UpdateTask);

  //admin leave management
  app.route("/updateleavestatus/:id").post(UserApi.UpdateLeave);

  //admin-user
  app.route("/login/admin").post(UserApi.adminLogin); //no auth

  //edit user profile
  app.route("/updateprofile/:id").post(UserApi.updateProfile);

  //get profile
  app.route("/myprofile/:id").get(UserApi.MyProfile);

  //get admin profile
  app.route("/myadminprofile/:id").get(UserApi.MyAdminProfile);

  //get the all the events
  app.route("/dates/:id").get(UserApi.date);

  //events
  app.route("/events/:id").post(UserApi.event)

  //get event
  app.route("/getevent").get(UserApi.ev)

  //company info
  app.route("/CoInfo").post(UserApi.Co)

  //
  app.route("/de/:id").post(UserApi.so)


};
