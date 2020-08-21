const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Note = require("../../models/Note");

//route GET api/notes
router.get("/", auth, async (req, res) => {
  try {
    const allnotes = await Note.findOne({ user: req.user.id });
    res.json(allnotes.notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route POST api/notes
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("text", "Content is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, text } = req.body;
      const newNote = {
        title,
        text,
      };
      var allnotes = await Note.findOne({ user: req.user.id });
      if (allnotes === null) {
        const newUser = {
          user: req.user.id,
        };
        allnotes = await Note.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: newUser,
          },
          { new: true, upsert: true }
        );
      }

      allnotes = await Note.findOne({ user: req.user.id });
      allnotes.notes.unshift(newNote);
      await allnotes.save();

      res.json(allnotes.notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//route DELETE api/notes/:notes_id
router.delete(
  "/:notes_id",
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let allnotes = await Note.findOne({ user: req.user.id });
      allnotes.notes = allnotes.notes.filter(
        (item) => item._id.toString() !== req.params.notes_id
      );
      await allnotes.save();
      res.json(allnotes.notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
  }
);
//route PUT api/notes/:notes_id
router.patch("/:notes_id", auth, async (req, res) => {
  const { title, text } = req.body;
  try {
    let allnotes = await Note.findOne({ user: req.user.id });
    allnotes.notes = allnotes.notes.map((item) => {
      if (item._id.toString() === req.params.notes_id) {
        item.title = title;
        item.text = text;
      }
      return item;
    });
    await allnotes.save();
    res.json(allnotes.notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//route PATCH api/notes/:notes_id
module.exports = router;
