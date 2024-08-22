import { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    // Fetch notes when the component mounts
    getNotes();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/api/note/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZThkNjJlOTRjYTE3ZTk1N2FmZWJhIn0sImlhdCI6MTcyMTY2NzE1Nn0.Xrc6w7fG8GHI9JXCsKY3RtNthUgqK9vz6z2jAGeeYUw",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const json = await response.json();
      const newNote = {
        _id: json._id,
        user: json.user,
        title: json.title,
        description: json.description,
        tag: json.tag,
        date: json.date,
        __v: json.__v,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]); // Update notes list
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      const json = await response.json();
      console.log(json);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));

      // Logic to edit in client
      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i];
        if (element._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
