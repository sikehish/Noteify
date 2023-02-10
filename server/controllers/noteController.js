const Note = require("../models/noteModel");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uid: req.user });
    if (!notes) {
      throw new Error("No note found");
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editNote = async (req, res) => {
  try {
    console.log("ID: ", req.params.id, req.body);
    const allNotes = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const allNotes = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const id = req.user;
    console.log(req.body);
    const allNotes = await Note.create({ ...req.body, uid: id });
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
