import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNote, removeNote, modifyNote, getNotes } from "../actions/notes";
import { useEffect, Fragment, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@material-ui/icons/Add";

const Note = ({ removeNote, getNotes, modifyNote, notes }) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    const get = async () => {
      await getNotes();
    };

    get();
  }, [getNotes]);
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState({
    title: "",
    text: "",
  });
  const [id , setId]=useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const submitNote=(event)=> {
   setEditMode(false);
   const _id = id;
   modifyNote(note.title,note.text,_id); 
   setNote({
      title: "",
      text: ""
    });

    event.preventDefault();
  }
  const onDelete = (event) => {
    removeNote(event.currentTarget.parentNode.getAttribute("data-key"));
  };
  const onEdit = (event) => {
    setEditMode(true);
    const key=event.currentTarget.parentNode.getAttribute("data-key");
    setId(key);
    const editNote=notes.find((item)=>item._id===key);
    const {title , text} = editNote;
    setNote({
      title,
      text
    });
    event.preventDefault();
  };

  if (notes) {
    var list = notes.map((item) => {
      return (
        <div className="note" data-key={item._id} key={item._id}>
          <h1>{item.title}</h1>
          <p>{item.text}</p>
          <button onClick={onDelete}>
            <DeleteIcon />
          </button>
          {!editMode && (
            <button onClick={onEdit}>
              <CreateIcon />
            </button>
          )}
        </div>
      );
    });
  }
  return (
    <Fragment>
      {list}
      {editMode && (
        <div className="edit-note">
          <form className="create-note ">
            
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
              rows={1}
            />
            
            <textarea
              name="text"
              onChange={handleChange}
              value={note.text}
              placeholder="Take a note..."
              rows={3}
            />
            <Zoom in={true}>
              <Fab onClick={submitNote}>
                <AddIcon />
              </Fab>
            </Zoom>
          </form>
        </div>
      )}
    </Fragment>
  );
};
Note.propTypes = {
  removeNote: PropTypes.func.isRequired,
  modifyNote: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});
export default connect(mapStateToProps, {
  addNote,
  removeNote,
  modifyNote,
  getNotes,
})(Note);
