const jwt = require("jsonwebtoken");
const { Router } = require("express");
const express = require("express");

const {
  getAllNotes,
  deleteNote,
  editNote,
  createNote,
} = require("../controllers/noteController");
const noteRouter = express.Router();

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // Format:' Bearer AuthToken'

  try {
    const { id } = jwt.verify(token, process.env.PVT_KEY);
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

noteRouter.use(checkAuth);

noteRouter.route("/note").get(getAllNotes).post(createNote);

noteRouter.route("/note/:id").delete(deleteNote).patch(editNote);

module.exports = noteRouter;
