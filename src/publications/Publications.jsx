import { useEffect } from "react";
import { connect } from "react-redux";
import Publication from "./Publication";
import { getData } from "./helpers/thunks";
import { getDataLoaded } from "./helpers/selectors";
import ErrorMessages from "./ErrorMessages";
import SavedMessage from "./SavedMessage";

import LoadingSpinner from "../shared/LoadingSpinner";

const Publications = ({ getData, data_loaded }) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SavedMessage />
      <ErrorMessages />
      {data_loaded ? <Publication /> : <LoadingSpinner />}
    </>
  );
};

const mapStateToProps = (state) => ({
  data_loaded: getDataLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
