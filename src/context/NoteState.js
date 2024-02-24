import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const [notes, setNotes] = useState([]);

  //Get All the Notes
  const getAllNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNzM5ZDI5OWM5NmYwYTU5MTEyYTdhIn0sImlhdCI6MTcwODYxMDYzMX0.ozKtiQJzkFA2qJlsZKRRA_1Qu8YCGyrkKqR0EJSPF0M",
      },
    });
    const json = await response.json()
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNzM5ZDI5OWM5NmYwYTU5MTEyYTdhIn0sImlhdCI6MTcwODYxMDYzMX0.ozKtiQJzkFA2qJlsZKRRA_1Qu8YCGyrkKqR0EJSPF0M",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNzM5ZDI5OWM5NmYwYTU5MTEyYTdhIn0sImlhdCI6MTcwODYxMDYzMX0.ozKtiQJzkFA2qJlsZKRRA_1Qu8YCGyrkKqR0EJSPF0M",
      },
    });

    // eslint-disable-next-line
    const json = response.json();

    const newNote = notes.filter((note) => note._id !== id);
    setNotes( newNote )
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNzM5ZDI5OWM5NmYwYTU5MTEyYTdhIn0sImlhdCI6MTcwODYxMDYzMX0.ozKtiQJzkFA2qJlsZKRRA_1Qu8YCGyrkKqR0EJSPF0M",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // eslint-disable-next-line
    const json = await response.json();
 

    let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    
  };

  return (
    <NoteContext.Provider value={{ notes, getAllNotes,addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
