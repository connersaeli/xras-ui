import { connect } from "react-redux";
import { grantSearch } from "./helpers/thunks";
import { setGrantNumber } from "./helpers/actions";

const ProjectSearch = ({ grant_number, setGrantNumber, grantSearch }) => {
  return (
    <div className={"row"}>
      <div className={"col"}>
        If your project isn't listed above, you can manually add it by entering
        the grant number below.
        <div className={"input-group mt-1"}>
          <input
            type={"text"}
            className={"form-control"}
            value={grant_number}
            onChange={(e) => setGrantNumber(e.target.value)}
            placeholder="Enter a grant number"
          />
          <button className={"btn btn-primary"} onClick={() => grantSearch()}>
            Find Project
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setGrantNumber: (val) => dispatch(setGrantNumber(val)),
  grantSearch: () => dispatch(grantSearch()),
});

const mapStateToProps = (state) => ({
  grant_number: state.publications_store.grant_number,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSearch);
