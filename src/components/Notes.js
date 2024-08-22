import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnotes from "./Addnotes";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  let navigate = useNavigate();

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("updating the note....", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated successfully", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const context = useContext(noteContext);
  const { notes = [], getNotes, editNote } = context; // Ensure `notes` is always an array

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <Addnotes showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h2>Edit your note</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={3}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      value={note.edescription}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label" htmlFor="etag">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <h2>Your notes:</h2>
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
}
