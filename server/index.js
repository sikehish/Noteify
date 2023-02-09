const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/get", function (req, res) {
  res.send("Hello World");
});

app.get("/login", function (req, res) {
  res.send("Login");
});

app.get("/signup", function (req, res) {
  res.send("SignUp");
});

app.get("/create", function (req, res) {
  res.send("SignUp");
});

app.get("/delete", function (req, res) {
  res.send("SignUp");
});

app.listen(port, () => {
  console.log("Sup!!");
});

const connStr = process.env.MONGO_URI.replace("<password>", process.env.PASSWD);
// console.log(connStr);

// Running the app only when connection is succesful
mongoose
  .connect(connStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    app.listen(process.env.PORT || 8000, () => {
      console.log("LISTENIN..");
    });
  });
