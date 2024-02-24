import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = () => {
    const context = useContext(NoteContext);
    
    const {addNote} = context;

    const [note, setnote] = useState({title:" ", description:" ", tag:"Default"});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setnote({
            ...note, [e.target.name]: e.target.value
        })
    }

  return (
    <div>
      <div className="container my-3">
        <h2>Create Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={onChange}
              className="form-control"
            />
          </div>
          <button type="submit" onClick={handleClick} className="btn btn-primary">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
