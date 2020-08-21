import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { addNote } from "../actions/notes";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
const CreateArea=(props) =>{
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    text: ""
  });

  const handleChange=(event)=> {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const submitNote=(event)=> {
    props.addNote(note.title,note.text);
    setNote({
      title: "",
      text: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="text"
          onClick={expand}
          onChange={handleChange}
          value={note.text}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
CreateArea.propTypes={
  addNote :PropTypes.func.isRequired,
  notes:PropTypes.any,
}


const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});
export default connect(mapStateToProps,{addNote})(CreateArea);
