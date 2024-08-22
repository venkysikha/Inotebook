import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNotes(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" }); // Clear the form after adding the note
      props.showAlert("Added successfully", "success");
    } catch (error) {
      props.showAlert("Failed to add note", "danger");
    }
  };
  

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container my-3">
      <h2>Add Your Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag:
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
