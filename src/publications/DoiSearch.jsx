import { connect } from "react-redux";
import { getDoi } from "./helpers/selectors";
import { updatePublication } from "./helpers/actions";
import { doiLookup } from "./helpers/thunks";

const DoiSearch = ({ doi, updatePublication, doiLookup }) => {
  return (
    <div className={"row mb-3"}>
      <div className={"col"}>
        <label htmlFor={"doi"} className={"form-label"}>
          DOI
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="doi"
            name={"publication[doi]"}
            aria-label="DOI Input and Search box"
            aria-describedby="doi_button"
            value={doi}
            onChange={(el) => updatePublication(el.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="doi_button"
            onClick={() => doiLookup()}
          >
            Lookup Publication
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  doi: getDoi(state),
});

export const mapDispatchToProps = (dispatch) => ({
  updatePublication: (doi) =>
    dispatch(updatePublication({ key: "doi", value: doi })),
  doiLookup: () => dispatch(doiLookup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoiSearch);
