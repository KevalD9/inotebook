import React, {useContext, useEffect} from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(NoteContext);
    
    const { notes, getAllNotes } = context;
    useEffect(() => {
      getAllNotes()
      // eslint-disable-next-line
    }, []);
    
  return (
    <div className="container">

    <AddNote/>
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
    </div>
  );
}; 

export default Notes;
