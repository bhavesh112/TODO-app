import React from "react";
import CreateArea from "../CreateArea";
import Note from "../Note";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Dashboard = ({ edit }) => {
  return (
    <div>
      {!edit && <CreateArea></CreateArea>}
      <Note></Note>
    </div>
  );
};

Dashboard.propTypes = {
  edit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  edit: state.edit.edit,
});

export default connect(mapStateToProps, null)(Dashboard);
