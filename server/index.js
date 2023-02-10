require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const noteRouter = require("./routers/noteRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api", noteRouter);

const connStr = process.env.MONGO_URI.replace(
  "<password>",
  process.env.MONGO_PASSWD
);

mongoose.set("strictQuery", true);

mongoose
  .connect(connStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Working fine!");
    });
  });
