import { connect } from "react-redux";
import { getErrors } from "./helpers/selectors";
import { hideError } from "./helpers/actions";

const ErrorMessages = ({ errors, hideError }) => {
  return (
    <>
      {errors.map((err) => (
        <div
          key={`err_${err.id}`}
          className={"alert alert-danger alert-dismissible sticky-top"}
        >
          {err.message}
          <button
            type={"button"}
            className={"btn-close"}
            aria-label={"Close"}
            onClick={() => hideError(err.id)}
          ></button>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideError: (id) => dispatch(hideError(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessages);
