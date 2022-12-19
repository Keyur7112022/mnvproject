"use strict";

const auth = require("../middleware/auth");

module.exports = function (app) {
  const UserApi = require("../controller/userController");

  //request for the leave
  app.route("/leave/:id").post(UserApi.Leave_of);

  //Hr get all the leave list And the Admin who are add can also se the request
  app.route("/getLeaveList/:id").get(UserApi.getLeaveList);

  //add task by admin
  app.route("/Checklist").post(UserApi.toDo);

  //user can see tasks
  app.route("/my-task").post(UserApi.tasklist);

  //register
  app.route("/register").post(UserApi.register_admin);

  //user register by admin portal
  app.route("/register/user").post(UserApi.register_user);

  //user login
  app.route("/login").post(UserApi.Login);

  app.route("/employees").get(UserApi.Employees);

  app.route("/tasks/:id").get(auth, UserApi.GetTasks);

  app.route("/updatetask/:id").post(UserApi.UpdateTask);

  //admin-user
  app.route("/login/admin").post(UserApi.adminLogin);

  //edit user profile
  app.route("/updateprofile/:id").post(UserApi.updateProfile);
  //get profile
  app.route("/myprofile/:id").get(UserApi.MyProfile);

  //get admin profile
  app.route("/myadminprofile/:id").get(UserApi.MyAdminProfile);

  app.route("/dates").get(UserApi.date);

  //change password
  app.route("/changepassword").post(UserApi.change)


  //forgot password
  app.route("/forgotpassword").post(UserApi.forgot)

};
