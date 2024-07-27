const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
//Route 1:get all the notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try{

    const notes = await Note.find({ user: req.user.id });
  res.json(notes);
  }
  catch(error)
  {
    console.error(error.message);
    res.status(500).send("internal server error ");
  }
});

//route 2: adding the notes using the post request

router.post(
  "/addnote",
  [
    body("title", "ener valid title").isLength({ min: 3 }),
    body("description", "description must have 5 letters").isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    // if there are erros return the bad request and errors

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error ");
    }
  }
);


// route :3 update an existing note using :put "/api/note/updatenote:login required"
router.put('/updatenote/:id',fetchUser,
    async(req,res)=>
    {
        const {title,description,tag}=req.body;
        //create a newnote object 
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        // find the note to be updated and update it 
        let note= await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("not found");
        }
        if(note.user.toString() !==  req.user.id)
        {
            return res.status(401).send("Not allowed");
        }
        note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }
)



// route :4 deleting an existing note using :delete "/api/note/deletenote:login required"
router.delete('/deletenote/:id',fetchUser,
    async(req,res)=>
    {
        const {title,description,tag}=req.body;
        // find the note to be deleted and delete it 
try{
        let note= await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("not found");
        }

        // allow the deletion only if user owns this note
        if(note.user.toString() !==  req.user.id)
        {
            return res.status(401).send("Not allowed");
        }
        note =await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"this id had been deleted",note:note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error ");
    }
}
)
module.exports = router;
