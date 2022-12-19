const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const leave = require("./models/leave");
const cors = require('cors')

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const routes = require("./routes/UserApi");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
