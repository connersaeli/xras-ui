import { connect } from "react-redux";
import { getAuthors, getAuthorsExist } from "./helpers/selectors";
import { addAuthor } from "./helpers/actions";
import Author from "./Author";

const Authors = ({ authors, addAuthor, authors_exist }) => {
  const noAuthors = authors.length === 0;
  const showError = () => {
    return authors_exist ? (
      ""
    ) : (
      <div className={"alert alert-danger"}>
        You must add at least one author and each author must have a first and
        last name
      </div>
    );
  };

  return (
    <div>
      {showError()}
      <table className={"table"}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Affiliation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a, i) => (
            <Author author={a} authorKey={i} key={`author_${i}`} />
          ))}
          {noAuthors && <Author author={addAuthor()} />}
        </tbody>
      </table>
      <button className={"btn btn-primary mt-3"} onClick={() => addAuthor()}>
        Add Author
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authors: getAuthors(state),
  authors_exist: getAuthorsExist(state),
});

const mapDispatchToProps = (dispatch) => ({
  addAuthor: () => dispatch(addAuthor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
