const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();

//Route - 1 => Get all the notes using : GET "/api/auth/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Problem." });
  }
});

//Route - 2 => Add note for login User using : POST "/api/auth/addnote". Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").notEmpty().withMessage("Enter a valid title."),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    //If there are error then send them back in the response with status as Bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    //Destructur title, description, tag value from user input
    const { title, description, tag } = req.body;

    try {
      const note = new Notes({ user: req.user.id, title, description, tag });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Problem." });
    }
  }
);

//Route - 3 => Update an existing note for User using : PUT "/api/auth/updatenote/:id". Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    try {
      const {title, description, tag} = req.body;

      //Create a new note object
      const newNote = {};
      if(title){newNote.title = title }; 
      if(description){newNote.description = description };
      if(tag){newNote.tag = tag };

      //Find the note to be update and update it
      let note = await Notes.findById(req.params.id);  
      if(!note){ return  res.status(404).json({msg:"No Note Found"})};
      if(note.user.toString() !== req.user.id ) { return res.status(401).json({msg:"Not Allowed."})};

      note = await Notes.findByIdAndUpdate(req.params.id ,{$set: newNote }, {new:true});
      res.json(note);

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Problem." });
    }
  });

  //Route - 4 => Delete an existing note for User using : DEETE "/api/auth/deletenote/:id". Login Required
  router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
    
      //Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);  
      if(!note){ return  res.status(404).json({msg:"No Note Found"})};
      if(note.user.toString() !== req.user.id ) { return res.status(401).json({msg:"Not Allowed."})};

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Deleted Sucessfully." , Note : note});

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Problem." });
    }
  });

module.exports = router;
