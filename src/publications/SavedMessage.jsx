import { connect } from "react-redux";
import { updateShowSaved } from "./helpers/actions";
import { getShowSaved } from "./helpers/selectors";

const SavedMessage = ({ show_saved, updateShowSaved }) => {
  const message = (
    <div className={"alert alert-success alert-dismissible sticky-top"}>
      Publication Saved Successfully!
      <button
        type={"button"}
        className={"btn-close"}
        aria-label={"Close"}
        onClick={() => updateShowSaved(false)}
      ></button>
    </div>
  );

  if (show_saved) {
    return message;
  }

  return <></>;
};

const mapStateToProps = (state) => ({
  show_saved: getShowSaved(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateShowSaved: (data) => dispatch(updateShowSaved(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedMessage);
